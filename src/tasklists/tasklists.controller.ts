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
import { TasklistsService } from './tasklists.service';
import { CreateTasklistDto } from './dto/create-tasklist.dto';
import { UpdateTasklistDto } from './dto/update-tasklist.dto';
import { AuthGuard } from '../auth/auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { TasklistEntity } from './entities/tasklist.entity';

@ApiTags('tasklists')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('tasklists')
export class TasklistsController {
  constructor(private readonly tasklistsService: TasklistsService) {}

  @Post()
  @ApiCreatedResponse({ type: TasklistEntity })
  create(@Body() createTasklistDto: CreateTasklistDto, @Request() req: any) {
    return this.tasklistsService.create(createTasklistDto, req.user.sub);
  }

  @Get()
  @ApiOkResponse({ type: TasklistEntity })
  findDefault(@Request() req: any) {
    return this.tasklistsService.findDefault(req.user.sub);
  }

  @Get(':id')
  @ApiOkResponse({ type: TasklistEntity })
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.tasklistsService.findOne(+id, req.user.sub);
  }

  @Patch(':id')
  @ApiOkResponse({ type: TasklistEntity })
  update(
    @Param('id') id: string,
    @Body() updateTasklistDto: UpdateTasklistDto,
    @Request() req: any,
  ) {
    return this.tasklistsService.update(+id, updateTasklistDto, req.user.sub);
  }

  @Delete(':id')
  @ApiOkResponse({ type: TasklistEntity })
  remove(@Param('id') id: string, @Request() req: any) {
    return this.tasklistsService.remove(+id, req.user.sub);
  }
}
