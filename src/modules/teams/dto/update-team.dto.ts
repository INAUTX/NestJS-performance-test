import { IsOptional, IsString, IsBoolean, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTeamDto {
  @ApiPropertyOptional({ example: 'The Champions', description: 'Name of the team' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: true, description: 'Active status of the team in the tournament' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ example: 1, description: 'ID of the tournament to which the team belongs' })
  @IsOptional()
  @IsNumber()
  tournamentId?: number;
}
