import { Module } from '@nestjs/common';
import { MatchesController } from './matchs.controller';
import { MatchesService } from './matchs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from '../tournaments/entities/tournament.entity';
import { Team } from '../teams/entities/team.entity';
import { Match } from './entities/match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Match, Team, Tournament])],
  controllers: [MatchesController],
  providers: [MatchesService],
})
export class MatchsModule {}
