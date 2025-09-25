import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Buy groceries' })
  title: string;

  @ApiProperty({ example: false })
  completed: boolean;

  @ApiProperty({ example: 1 })
  taskListId: number;
}
