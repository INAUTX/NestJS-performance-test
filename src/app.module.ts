import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './modules/players/players.module';
import { TournamentsModule } from './modules/tournaments/tournaments.module';
import { TeamsModule } from './modules/teams/teams.module';

@Module({
  imports: [PlayersModule, TournamentsModule, TeamsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
