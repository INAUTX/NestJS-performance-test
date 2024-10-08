import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './entities/match.entity';
import { Team } from '../teams/entities/team.entity';
import { Tournament } from '../tournaments/entities/tournament.entity';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
  ) {}

  async createMatchesForTournament(tournamentId: number): Promise<{ matches: Match[], teamWithoutOpponent: Team | null }> {
    const tournament = await this.tournamentRepository.findOne({ where: { id: tournamentId } });

    if (!tournament) {
      throw new Error(`Tournament with ID ${tournamentId} not found`);
    }

    // Obtener todos los equipos activos del torneo
    const teams = await this.teamRepository.find({
      where: { tournament: { id: tournamentId }, isActive: true },
    });

    // Barajar los equipos para generar combinaciones aleatorias
    const shuffledTeams = teams.sort(() => Math.random() - 0.5);
    const matches: Match[] = [];
    let teamWithoutOpponent: Team | null = null;

    // Crear los partidos 1vs1
    for (let i = 0; i < shuffledTeams.length; i += 2) {
      if (i + 1 < shuffledTeams.length) {
        const match = this.matchRepository.create({
          teamOne: shuffledTeams[i],
          teamTwo: shuffledTeams[i + 1],
          tournament: tournament,
        });
        matches.push(await this.matchRepository.save(match));
      } else {
        // If there is a team with no opponent, it is saved as the team that does not participate.
        teamWithoutOpponent = shuffledTeams[i];
      }
    }

    return { matches, teamWithoutOpponent };
  }

    async findAllMatches(): Promise<Match[]> {
      return this.matchRepository.find({ relations: ['teamOne', 'teamTwo', 'tournament'] });
    }
  
    async findCompletedMatches(page: number = 1, limit: number = 10): Promise<{ data: Match[], total: number, currentPage: number, totalPages: number }> {
      const [data, total] = await this.matchRepository.findAndCount({
        where: { isCompleted: true },
        relations: ['teamOne', 'teamTwo', 'tournament'],
        take: limit,
        skip: (page - 1) * limit,
      });
  
      return {
        data,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      };
    }
  
    async updateMatchCompletionStatus(matchId: number, isCompleted: boolean): Promise<Match> {
      const match = await this.matchRepository.findOne({ where: { id: matchId } });
      if (!match) {
        throw new NotFoundException(`Match with ID ${matchId} not found`);
      }
  
      match.isCompleted = isCompleted;
      return this.matchRepository.save(match);
    }
}
