import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './entities/task.entity';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { NotFoundException } from '@nestjs/common';
import { supabase } from '../config/supabase.client';
import { KafkaService } from '../kafka/kafka.service';

@Injectable()
export class TasksService {
    constructor(private readonly kafkaService: KafkaService) { }

    async findAll(): Promise<Task[]> {
        const tasks = await this.fetchAllTasks();
        return tasks;
    }

    async create(dto: CreateTaskDto): Promise<Task> {
        const task = await this.insertTask(dto);
        await this.kafkaService.sendMessage('task_events', 'task_created', task);
        return task;
    }

    async updateStatus(id: string, dto: UpdateTaskStatusDto): Promise<Task> {
        const task = await this.updateTaskStatus(id, dto);
        await this.kafkaService.sendMessage('task_events', 'task_updated', task);
        return task;
    }

    async remove(id: string): Promise<void> {
        const task = await this.deleteTask(id);
        await this.kafkaService.sendMessage('task_events', 'task_deleted', task);
    }

    // ===== PRIVATE METHODS =====

    private async fetchAllTasks(): Promise<Task[]> {
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .order('createdAt', { ascending: false });

        if (error) throw new Error(error.message);
        return data as Task[];
    }

    private async insertTask(dto: CreateTaskDto): Promise<Task> {
        const { title, description } = dto;
        const { data, error } = await supabase
            .from('tasks')
            .insert([{ title, description, completed: false, status: 'pending' }])
            .select()
            .single();

        if (error) throw new Error(error.message);
        return data as Task;
    }

    private async updateTaskStatus(id: string, dto: UpdateTaskStatusDto): Promise<Task> {
        const newStatus = dto.completed ? TaskStatus.COMPLETED : TaskStatus.PENDING;
        const { data, error } = await supabase
            .from('tasks')
            .update({ completed: dto.completed, status: newStatus })
            .eq('id', id)
            .select()
            .single();

        if (error) throw new Error(error.message);
        if (!data) throw new NotFoundException(`Tarefa com id ${id} não encontrada.`);

        return data as Task;
    }

    private async deleteTask(id: string): Promise<Task> {
        const { data, error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', id)
            .select()
            .single();

        if (error) throw new Error(error.message);
        if (!data) throw new NotFoundException(`Tarefa com id ${id} não encontrada.`);

        return data as Task;
    }
}
