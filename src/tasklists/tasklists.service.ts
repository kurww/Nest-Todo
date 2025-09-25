import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateTasklistDto } from './dto/create-tasklist.dto';
import { UpdateTasklistDto } from './dto/update-tasklist.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasklistsService {
  constructor(private prisma: PrismaService) {}

  async create(createTasklistDto: CreateTasklistDto, userId: number) {
    return this.prisma.taskList.create({
      data: {
        ...createTasklistDto,
        userId,
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.taskList.findMany({
      where: { userId },
      include: {
        tasks: true,
      },
    });
  }

  async findOne(id: number, userId: number) {
    const tasklist = await this.prisma.taskList.findUnique({
      where: { id },
      include: {
        tasks: true,
      },
    });

    if (!tasklist) {
      throw new NotFoundException('Tasklist not found');
    }

    if (tasklist.userId !== userId) {
      throw new ForbiddenException('Access denied to this tasklist');
    }

    return tasklist;
  }

  async update(
    id: number,
    updateTasklistDto: UpdateTasklistDto,
    userId: number,
  ) {
    const tasklist = await this.findOne(id, userId);

    return this.prisma.taskList.update({
      where: { id },
      data: updateTasklistDto,
    });
  }

  async remove(id: number, userId: number) {
    const tasklist = await this.findOne(id, userId);

    return this.prisma.taskList.delete({ where: { id } });
  }
}
