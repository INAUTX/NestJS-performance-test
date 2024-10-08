import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tournament } from './entities/tournament.entity';
import { Team } from '../teams/entities/team.entity';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';

@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async createTournament(createTournamentDto: CreateTournamentDto): Promise<Tournament> {
    const tournament = this.tournamentRepository.create(createTournamentDto);
    return this.tournamentRepository.save(tournament);
  }
  
  async findAllTournaments(): Promise<Tournament[]> {
    return this.tournamentRepository.find();
  }

  async findTournamentsWithFilter(
    hasWinner: boolean,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: Tournament[]; total: number; currentPage: number; totalPages: number }> {
    const queryBuilder = this.tournamentRepository
      .createQueryBuilder('tournament')
      .leftJoinAndSelect('tournament.teams', 'team') // participating teams
      .leftJoinAndSelect('tournament.winner', 'winner')  // winning team if any
      .where(hasWinner ? 'tournament.winner IS NOT NULL' : 'tournament.winner IS NULL');

    const [data, total] = await queryBuilder
      .take(limit)
      .skip((page - 1) * limit)
      .getManyAndCount();

    return {
      data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getTournamentsWonByTeam(teamId: number, page: number = 1, limit: number = 10): Promise<Tournament[]> {
    const skip = (page - 1) * limit;
  
    return this.tournamentRepository
      .createQueryBuilder('tournament')
      .leftJoinAndSelect('tournament.winner', 'winner')
      .where('winner.id = :teamId', { teamId })
      .skip(skip) // Number of results to skip based on the page
      .take(limit) // Number of results per page
      .getMany();
  }

  async updateTournamentName(tournamentId: number, updateTournamentDto: UpdateTournamentDto): Promise<Tournament> {
    const tournament = await this.tournamentRepository.findOne({ where: { id: tournamentId } });
    if (!tournament) {
      throw new NotFoundException(`Tournament with ID ${tournamentId} not found`);
    }

    tournament.name = updateTournamentDto.name || tournament.name;
    return this.tournamentRepository.save(tournament);
  }

  async deleteTournament(tournamentId: number): Promise<void> {
    const result = await this.tournamentRepository.delete(tournamentId);
    if (result.affected === 0) {
      throw new NotFoundException(`Tournament with ID ${tournamentId} not found`);
    }
  }

  async updateWinner(tournamentId: number, winnerId: number): Promise<Tournament> {
    const tournament = await this.tournamentRepository.findOne({ where: { id: tournamentId } });
    if (!tournament) {
      throw new NotFoundException(`Tournament with ID ${tournamentId} not found`);
    }

    const winner = await this.teamRepository.findOne({ where: { id: winnerId } });
    if (!winner) {
      throw new NotFoundException(`Team with ID ${winnerId} not found`);
    }

    tournament.winner = winner;
    return this.tournamentRepository.save(tournament);
  }

  async findTeamsByTournamentWithFilter(
    tournamentId: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: Team[]; total: number; currentPage: number; totalPages: number }> {
    const queryBuilder = this.teamRepository
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.tournament', 'tournament')
      .where('tournament.id = :tournamentId', { tournamentId })
      .andWhere('team.isActive = :isActive', { isActive: true })
      .take(limit)
      .skip((page - 1) * limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }
  
}
