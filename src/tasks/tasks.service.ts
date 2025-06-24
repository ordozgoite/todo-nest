import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './entities/task.entity';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { NotFoundException } from '@nestjs/common';
import { supabase } from '../config/supabase.client';

@Injectable()
export class TasksService {
    async findAll(): Promise<Task[]> {
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .order('createdAt', { ascending: false });

        if (error) throw new Error(error.message);
        return data as Task[];
    }

    async create(dto: CreateTaskDto): Promise<Task> {
        const { title, description } = dto;

        const { data, error } = await supabase.from('tasks').insert([
            {
                title,
                description,
                completed: false,
                status: 'pending',
            },
        ]).select().single();

        if (error) throw new Error(error.message);
        return data as Task;
    }

    async updateStatus(id: string, dto: UpdateTaskStatusDto): Promise<Task> {
        const newStatus = dto.completed ? TaskStatus.COMPLETED : TaskStatus.PENDING;

        const { data, error } = await supabase
            .from('tasks')
            .update({
                completed: dto.completed,
                status: newStatus,
            })
            .eq('id', id)
            .select()
            .single();

        if (error) throw new Error(error.message);
        if (!data) throw new Error(`Tarefa com id ${id} não encontrada.`);

        return data as Task;
    }

    async remove(id: string): Promise<void> {
        const { data, error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', id)
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }

        if (!data) {
            throw new NotFoundException(`Tarefa com id ${id} não encontrada.`);
        }
    }
}
