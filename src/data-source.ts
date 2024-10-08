import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Player } from './modules/players/entities/player.entity';
import { Team } from './modules/teams/entities/team.entity';
import { Tournament } from './modules/tournaments/entities/tournament.entity';
import { Match } from './modules/matchs/entities/match.entity';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Player, Team, Tournament, Match],
  synchronize: false,
  logging: false,
});
