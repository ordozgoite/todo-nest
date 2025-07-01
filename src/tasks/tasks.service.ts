import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
// import { supabase } from '../config/supabase.client';
import { ClientKafka } from '@nestjs/microservices';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class TasksService {
    private readonly supabase: SupabaseClient; 

    constructor(
        @Inject('KAFKA_SERVICE')
        private readonly kafkaClient: ClientKafka,

        private readonly supabaseService: SupabaseService
    ) {
        this.supabase = this.supabaseService.getClient();
    }

    async findAll(): Promise<Task[]> {
        const tasks = await this.fetchAllTasks();
        return tasks;
    }

    async create(dto: CreateTaskDto): Promise<Task> {
        const task = await this.insertTask(dto);
        this.kafkaClient.emit('task_events', {
            eventType: 'task_created',
            data: task,
        });
        return task;
    }

    async updateStatus(id: string, dto: UpdateTaskStatusDto): Promise<Task> {
        const task = await this.updateTaskStatus(id, dto);
        this.kafkaClient.emit('task_events', {
            eventType: 'task_updated',
            data: task,
        });
        return task;
    }

    async remove(id: string): Promise<void> {
        const task = await this.deleteTask(id);
        this.kafkaClient.emit('task_events', {
            eventType: 'task_deleted',
            data: task,
        });
    }

    // ===== PRIVATE METHODS =====

    private async fetchAllTasks(): Promise<Task[]> {
        const { data, error } = await this.supabase
            .from('tasks')
            .select('*')
            .order('createdAt', { ascending: false });

        if (error) throw new Error(error.message);
        return data as Task[];
    }

    private async insertTask(dto: CreateTaskDto): Promise<Task> {
        const { title, description } = dto;
        const { data, error } = await this.supabase
            .from('tasks')
            .insert([{ title, description, completed: false, status: 'pending' }])
            .select()
            .single();

        if (error) throw new Error(error.message);
        return data as Task;
    }

    private async updateTaskStatus(id: string, dto: UpdateTaskStatusDto): Promise<Task> {
        const newStatus = dto.completed ? TaskStatus.COMPLETED : TaskStatus.PENDING;
        const { data, error } = await this.supabase
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
        const { data, error } = await this.supabase
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
