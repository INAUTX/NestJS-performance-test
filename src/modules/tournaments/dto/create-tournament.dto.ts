import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTournamentDto {
  @ApiProperty({ example: 'World Cup', description: 'Name of the tournament' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
