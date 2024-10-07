import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTournamentDto {
  @ApiPropertyOptional({ example: 'World Cup', description: 'Name of the tournament' })
  @IsOptional()
  @IsString()
  name?: string;
}
