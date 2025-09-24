import { Injectable } from '@nestjs/common';
import { CreateTasklistDto } from './dto/create-tasklist.dto';
import { UpdateTasklistDto } from './dto/update-tasklist.dto';

@Injectable()
export class TasklistsService {
  create(createTasklistDto: CreateTasklistDto) {
    return 'This action adds a new tasklist';
  }

  findAll() {
    return `This action returns all tasklists`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tasklist`;
  }

  update(id: number, updateTasklistDto: UpdateTasklistDto) {
    return `This action updates a #${id} tasklist`;
  }

  remove(id: number) {
    return `This action removes a #${id} tasklist`;
  }
}
