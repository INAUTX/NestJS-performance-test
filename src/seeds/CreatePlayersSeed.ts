import { DataSource } from 'typeorm';
import { Player } from '../modules/players/entities/player.entity';
import { Team } from '../modules/teams/entities/team.entity';

export class CreatePlayersSeed {
  async run(dataSource: DataSource) {
    const playerRepository = dataSource.getRepository(Player);
    const teamRepository = dataSource.getRepository(Team);

    const team = await teamRepository.findOne({ where: { name: 'The Champions' } });

    const players = [
      { name: 'John Doe', goals: 5, team },
      { name: 'Jane Smith', goals: 7, team },
      { name: 'Chris Johnson', goals: 3, team },
    ];

    await playerRepository.save(players);
  }
}
