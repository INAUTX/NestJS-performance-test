import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePlayerDto {
  @ApiPropertyOptional({ example: 'John Doe', description: 'Name of the player' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 1, description: 'ID of the team to which the player belongs' })
  @IsOptional()
  @IsNumber()
  teamId?: number;
}
