import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './entities/task.entity';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    findAll(): Task[] {
        return this.tasks;
    }

    create(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;

        const newTask: Task = {
            id: uuid(),
            title,
            description,
            completed: false,
            status: TaskStatus.PENDING,
            createdAt: new Date(),
        };

        this.tasks.push(newTask);
        return newTask;
    }

    updateStatus(id: string, updateDto: UpdateTaskStatusDto): Task {
        const task = this.tasks.find((task) => task.id === id);

        if (!task) {
            throw new NotFoundException(`Task with id ${id} not found.`);
        }

        task.completed = updateDto.completed;
        task.status = updateDto.completed ? TaskStatus.COMPLETED : TaskStatus.PENDING;

        return task;
    }

    remove(id: string): void {
        const index = this.tasks.findIndex((task) => task.id === id);

        if (index === -1) {
            throw new NotFoundException(`Task with id ${id} not found.`);
        }

        this.tasks.splice(index, 1);
    }
}
