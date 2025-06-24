import { Body, Controller, Get, Post, Param, Patch, Delete, HttpCode } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Get()
    async findAll(): Promise<Task[]> {
        return this.tasksService.findAll();
    }

    @Post()
    async create(@Body() dto: CreateTaskDto): Promise<Task> {
        return this.tasksService.create(dto);
    }

    @Patch(':id')
    async updateStatus(
        @Param('id') id: string,
        @Body() updateDto: UpdateTaskStatusDto,
    ): Promise<Task> {
        return this.tasksService.updateStatus(id, updateDto);
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id: string): Promise<void> {
        await this.tasksService.remove(id);
    }
}
