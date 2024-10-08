import { DataSource } from 'typeorm';
import { Team } from '../modules/teams/entities/team.entity';
import { Tournament } from '../modules/tournaments/entities/tournament.entity';

export class CreateTeamsSeed {
  async run(dataSource: DataSource) {
    const teamRepository = dataSource.getRepository(Team);
    const tournamentRepository = dataSource.getRepository(Tournament);

    // Agregando equipos para el torneo 'World Cup'
    const worldCup = await tournamentRepository.findOne({ where: { name: 'World Cup' } });
    const worldCupTeams = [
      { name: 'The Lions', isActive: true, points: 0, tournament: worldCup },
      { name: 'The Eagles', isActive: true, points: 0, tournament: worldCup },
      { name: 'The Warriors', isActive: true, points: 0, tournament: worldCup },
      { name: 'The Giants', isActive: true, points: 0, tournament: worldCup },
      { name: 'The Tigers', isActive: true, points: 0, tournament: worldCup },
      { name: 'The Dragons', isActive: true, points: 0, tournament: worldCup },
      { name: 'The Panthers', isActive: true, points: 0, tournament: worldCup },
      { name: 'The Bears', isActive: true, points: 0, tournament: worldCup },
    ];
    await teamRepository.save(worldCupTeams);

    // Agregando equipos para el torneo 'Champions League'
    const championsLeague = await tournamentRepository.findOne({ where: { name: 'Champions League' } });
    const championsLeagueTeams = [
      { name: 'The Spartans', isActive: true, points: 0, tournament: championsLeague },
      { name: 'The Vikings', isActive: true, points: 0, tournament: championsLeague },
      { name: 'The Knights', isActive: true, points: 0, tournament: championsLeague },
      { name: 'The Wizards', isActive: true, points: 0, tournament: championsLeague },
      { name: 'The Falcons', isActive: true, points: 0, tournament: championsLeague },
      { name: 'The Wolves', isActive: true, points: 0, tournament: championsLeague },
      { name: 'The Hawks', isActive: true, points: 0, tournament: championsLeague },
      { name: 'The Cobras', isActive: true, points: 0, tournament: championsLeague },
    ];
    await teamRepository.save(championsLeagueTeams);

    // Agregando equipos para el torneo 'Copa América'
    const copaAmerica = await tournamentRepository.findOne({ where: { name: 'Copa América' } });
    const copaAmericaTeams = [
      { name: 'The Jaguars', isActive: true, points: 0, tournament: copaAmerica },
      { name: 'The Pumas', isActive: true, points: 0, tournament: copaAmerica },
      { name: 'The Condors', isActive: true, points: 0, tournament: copaAmerica },
      { name: 'The Rattlesnakes', isActive: true, points: 0, tournament: copaAmerica },
      { name: 'The Scorpions', isActive: true, points: 0, tournament: copaAmerica },
      { name: 'The Tarantulas', isActive: true, points: 0, tournament: copaAmerica },
      { name: 'The Crocodiles', isActive: true, points: 0, tournament: copaAmerica },
      { name: 'The Sharks', isActive: true, points: 0, tournament: copaAmerica },
    ];
    await teamRepository.save(copaAmericaTeams);

    console.log('Teams have been successfully added to each tournament');
  }
}
