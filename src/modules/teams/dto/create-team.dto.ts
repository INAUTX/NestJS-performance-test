import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
  @ApiProperty({ example: 'The Champions', description: 'Name of the team' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 1, description: 'ID of the tournament to which the team belongs' })
  @IsNotEmpty()
  @IsNumber()
  tournamentId: number;
}
