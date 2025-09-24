import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TasksModule } from './tasks/tasks.module';
import { TasklistsModule } from './tasklists/tasklists.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PrismaModule, TasksModule, TasklistsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
