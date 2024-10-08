import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { ApiOperation, ApiResponse, ApiParam, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('players')
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new player with a team' })
  @ApiBody({ type: CreatePlayerDto })
  @ApiResponse({ status: 201, description: 'Player created successfully.' })
  async createPlayer(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.createPlayer(createPlayerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all players' })
  @ApiResponse({ status: 200, description: 'List of all players retrieved successfully.' })
  async getAllPlayers() {
    return this.playersService.findAllPlayers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get player by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the player' })
  @ApiResponse({ status: 200, description: 'Player retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Player not found.' })
  async getPlayerById(@Param('id', ParseIntPipe) id: number) {
    return this.playersService.findPlayerById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a player and optionally change their team' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the player' })
  @ApiBody({ type: UpdatePlayerDto })
  @ApiResponse({ status: 200, description: 'Player updated successfully, including team change if applicable.' })
  @ApiResponse({ status: 404, description: 'Player or team not found.' })
  async updatePlayer(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ) {
    return this.playersService.updatePlayer(id, updatePlayerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a player' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the player' })
  @ApiResponse({ status: 204, description: 'Player deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Player not found.' })
  async deletePlayer(@Param('id', ParseIntPipe) id: number) {
    await this.playersService.deletePlayer(id);
  }
}
