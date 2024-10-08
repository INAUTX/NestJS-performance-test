import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './modules/players/players.module';
import { TournamentsModule } from './modules/tournaments/tournaments.module';
import { TeamsModule } from './modules/teams/teams.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { MatchsModule } from './modules/matchs/matchs.module';
config();



@Module({
  imports: [TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }
  ),
  PlayersModule, TournamentsModule, TeamsModule, MatchsModule]
})
export class AppModule {}
