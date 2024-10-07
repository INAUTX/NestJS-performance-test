import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlayerDto {
  @ApiProperty({ example: 'John Doe', description: 'Name of the player' })
  @IsNotEmpty()
  @IsString()
  name: string;
    
  @ApiProperty({ example: 1, description: 'ID of the team to which the player belongs' })
  @IsNotEmpty()
  @IsNumber()
  teamId: number;
}
