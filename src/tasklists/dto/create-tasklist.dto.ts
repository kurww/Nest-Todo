import { ApiProperty } from '@nestjs/swagger';

export class CreateTasklistDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  userId: number;

  
}
