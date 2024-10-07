import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTournamentDto {
  @ApiPropertyOptional({ example: 'World Cup', description: 'Name of the tournament' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 3, description: 'ID of the winning team of the tournament' })
  @IsOptional()
  @IsNumber()
  winnerId?: number;
}
