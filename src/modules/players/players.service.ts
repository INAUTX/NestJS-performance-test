import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Team } from '../teams/entities/team.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const { teamId, ...playerData } = createPlayerDto;

    const team = await this.teamRepository.findOne({ where: { id: teamId } });
    if (!team) {
      throw new NotFoundException(`Team with ID ${teamId} not found`);
    }

    const player = this.playerRepository.create({
      ...playerData,
      team,
    });

    return this.playerRepository.save(player);
  }

  async findAllPlayers(): Promise<Player[]> {
    return this.playerRepository.find({ relations: ['team'] });
  }

  async findPlayerById(id: number): Promise<Player> {
    const player = await this.playerRepository.findOne({ where: { id }, relations: ['team'] });
    if (!player) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }
    return player;
  }

  async updatePlayer(id: number, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    const { teamId, ...playerData } = updatePlayerDto;

    const player = await this.findPlayerById(id);

    if (teamId) {
      const newTeam = await this.teamRepository.findOne({ where: { id: teamId } });
      if (!newTeam) {
        throw new NotFoundException(`Team with ID ${teamId} not found`);
      }
      player.team = newTeam;
    }

    Object.assign(player, playerData);
    return this.playerRepository.save(player);
  }

  async deletePlayer(id: number): Promise<void> {
    const result = await this.playerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }
  }
}
