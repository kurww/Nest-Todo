import { Module } from '@nestjs/common';
import { TasklistsService } from './tasklists.service';
import { TasklistsController } from './tasklists.controller';

@Module({
  controllers: [TasklistsController],
  providers: [TasklistsService],
})
export class TasklistsModule {}
