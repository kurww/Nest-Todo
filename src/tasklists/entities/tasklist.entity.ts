import { ApiProperty } from '@nestjs/swagger';
import { TaskList } from '@prisma/client';

export class TasklistEntity implements TaskList {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
