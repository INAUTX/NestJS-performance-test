import { AppDataSource } from '../data-source';
import { CreateTournamentsSeed } from './CreateTournamentsSeed';
import { CreateTeamsSeed } from './CreateTeamsSeed';
import { CreatePlayersSeed } from './CreatePlayersSeed';

async function runSeeds() {
  try {
    await AppDataSource.initialize();
    console.log('Data source initialized successfully');

    await new CreateTournamentsSeed().run(AppDataSource);
    await new CreateTeamsSeed().run(AppDataSource);
    await new CreatePlayersSeed().run(AppDataSource);

    console.log('Seeds executed successfully');
    await AppDataSource.destroy();
  } catch (error) {
    console.error('Error running seeds:', error);
    await AppDataSource.destroy();
  }
}

runSeeds();
