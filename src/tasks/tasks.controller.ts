import { Body, Controller, Get, Post, Param, Patch, Delete, HttpCode } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Get()
    findAll(): Task[] {
        return this.tasksService.findAll();
    }

    @Post()
    create(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.create(createTaskDto);
    }

    @Patch(':id')
    updateStatus(
        @Param('id') id: string,
        @Body() updateDto: UpdateTaskStatusDto,
    ): Task {
        return this.tasksService.updateStatus(id, updateDto);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string): void {
        this.tasksService.remove(id);
    }
}
