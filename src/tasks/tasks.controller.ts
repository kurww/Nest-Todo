import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TaskEntity } from './entities/task.entity';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('tasks')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiCreatedResponse({ type: TaskEntity })
  create(@Body() createTaskDto: CreateTaskDto, @Request() req: any) {
    return this.tasksService.create(createTaskDto, req.user.sub);
  }

  @Get()
  @ApiOkResponse({ type: [TaskEntity] })
  findAll(@Request() req: any) {
    return this.tasksService.findAll(req.user.sub);
  }

  @Get(':id')
  @ApiOkResponse({ type: TaskEntity })
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.tasksService.findOne(+id, req.user.sub);
  }

  @Patch(':id')
  @ApiOkResponse({ type: TaskEntity })
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req: any,
  ) {
    return this.tasksService.update(+id, updateTaskDto, req.user.sub);
  }

  @Delete(':id')
  @ApiOkResponse({ type: TaskEntity })
  remove(@Param('id') id: string, @Request() req: any) {
    return this.tasksService.remove(+id, req.user.sub);
  }
}
