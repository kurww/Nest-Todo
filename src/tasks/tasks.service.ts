import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, userId: number) {
    // Find a default tasklist for the user or create one
    let taskList = await this.prisma.taskList.findFirst({
      where: { userId },
    });

    if (!taskList) {
      taskList = await this.prisma.taskList.create({
        data: {
          title: 'Default List',
          userId,
        },
      });
    }

    return this.prisma.task.create({
      data: {
        ...createTaskDto,
        taskListId: taskList.id,
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.task.findMany({
      where: {
        taskList: {
          userId,
        },
      },
      include: {
        taskList: true,
      },
    });
  }

  async findOne(id: number, userId: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        taskList: true,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.taskList.userId !== userId) {
      throw new ForbiddenException('Access denied to this task');
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, userId: number) {
    const task = await this.findOne(id, userId);

    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async remove(id: number, userId: number) {
    const task = await this.findOne(id, userId);

    return this.prisma.task.delete({ where: { id } });
  }
}
