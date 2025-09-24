import { Task } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class TaskEntity implements Task {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  completed: boolean;

  @ApiProperty()
  taskListId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
