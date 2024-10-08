import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Tournament } from '../tournaments/entities/tournament.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
  ) {}

  async createTeam(createTeamDto: CreateTeamDto): Promise<Team> {
    const { tournamentId, ...teamData } = createTeamDto;
    const tournament = await this.tournamentRepository.findOne({ where: { id: tournamentId } });
    if (!tournament) {
      throw new NotFoundException(`Tournament with ID ${tournamentId} not found`);
    }

    const team = this.teamRepository.create({
      ...teamData,
      tournament,
      points: 0,
    });
    return this.teamRepository.save(team);
  }

  async findAllTeams(): Promise<Team[]> {
    return this.teamRepository.find({ relations: ['players', 'tournament'] });
  }

  async findTeamById(id: number): Promise<Team> {
    const team = await this.teamRepository.findOne({ where: { id }, relations: ['players', 'tournament'] });
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    return team;
  }

  async updateTeam(id: number, updateTeamDto: UpdateTeamDto): Promise<Team> {
    const { tournamentId, ...teamData } = updateTeamDto;
    const team = await this.findTeamById(id);

    if (tournamentId) {
      const newTournament = await this.tournamentRepository.findOne({ where: { id: tournamentId } });
      if (!newTournament) {
        throw new NotFoundException(`Tournament with ID ${tournamentId} not found`);
      }
      team.tournament = newTournament;
    }

    Object.assign(team, teamData);
    return this.teamRepository.save(team);
  }

  async deleteTeam(id: number): Promise<void> {
    const result = await this.teamRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
  }
}
