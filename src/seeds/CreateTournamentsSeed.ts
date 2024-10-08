import { DataSource } from 'typeorm';
import { Tournament } from '../modules/tournaments/entities/tournament.entity';

export class CreateTournamentsSeed {
  async run(dataSource: DataSource) {
    const tournamentRepository = dataSource.getRepository(Tournament);

    const tournaments = [
      { name: 'World Cup' },
      { name: 'Champions League' },
      { name: 'Copa América' },
    ];

    await tournamentRepository.save(tournaments);
  }
}
