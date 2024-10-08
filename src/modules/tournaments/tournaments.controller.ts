import { Controller, Patch, Param, Body, ParseIntPipe, Delete, Post, Query, Get } from '@nestjs/common';
import { ApiParam, ApiBody, ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { TournamentsService } from './tournaments.service';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { CreateTournamentDto } from './dto/create-tournament.dto';

@ApiTags('Tournaments')
@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new tournament' })
  @ApiBody({ type: CreateTournamentDto })
  @ApiResponse({ status: 201, description: 'Tournament created successfully.' })
  async createTournament(@Body() createTournamentDto: CreateTournamentDto) {
    return this.tournamentsService.createTournament(createTournamentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tournaments' })
  @ApiResponse({ status: 200, description: 'List of tournaments.' })
  async getAllTournaments() {
    return this.tournamentsService.findAllTournaments();
  }
  @Get('filter')
  @ApiOperation({ summary: 'Get tournaments with filter and pagination' })
  @ApiQuery({ name: 'hasWinner', type: 'boolean', required: true, description: 'Filter tournaments with or without a winner' })
  @ApiQuery({ name: 'page', type: 'number', required: false, description: 'Page number for pagination', example: 1 })
  @ApiQuery({ name: 'limit', type: 'number', required: false, description: 'Number of items per page', example: 10 })
  @ApiResponse({ status: 200, description: 'Filtered list of tournaments retrieved successfully.' })
  async getFilteredTournaments(
    @Query('hasWinner') hasWinner: boolean,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.tournamentsService.findTournamentsWithFilter(hasWinner, page, limit);
  }

  @Get('won-by-team/:teamId')
  @ApiOperation({ summary: 'Get paginated tournaments won by a specific team' })
  @ApiParam({ name: 'teamId', type: 'number', description: 'ID of the team' })
  @ApiQuery({ name: 'page', type: 'number', required: false, description: 'Page number for pagination', example: 1 })
  @ApiQuery({ name: 'limit', type: 'number', required: false, description: 'Number of results per page', example: 10 })
  @ApiResponse({ status: 200, description: 'List of tournaments won by the team.' })
  @ApiResponse({ status: 404, description: 'Team not found.' })
  async getTournamentsWonByTeam(
    @Param('teamId', ParseIntPipe) teamId: number,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    return this.tournamentsService.getTournamentsWonByTeam(teamId, page, limit);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update the name of a tournament' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the tournament' })
  @ApiBody({ type: UpdateTournamentDto })
  @ApiResponse({ status: 200, description: 'Tournament name updated successfully.' })
  @ApiResponse({ status: 404, description: 'Tournament not found.' })
  async updateTournamentName(
    @Param('id', ParseIntPipe) tournamentId: number,
    @Body() updateTournamentDto: UpdateTournamentDto,
  ) {
    return this.tournamentsService.updateTournamentName(tournamentId, updateTournamentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a tournament' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the tournament' })
  @ApiResponse({ status: 204, description: 'Tournament deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Tournament not found.' })
  async deleteTournament(@Param('id', ParseIntPipe) tournamentId: number) {
    await this.tournamentsService.deleteTournament(tournamentId);
  }

  @Patch(':id/winner')
  @ApiOperation({ summary: 'Update the winner of a tournament' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the tournament' })
  @ApiBody({ schema: { properties: { winnerId: { type: 'number', example: 3, description: 'ID of the winning team' } } } })
  @ApiResponse({ status: 200, description: 'Winner updated successfully.' })
  @ApiResponse({ status: 404, description: 'Tournament or team not found.' })
  async updateWinner(
    @Param('id', ParseIntPipe) tournamentId: number,
    @Body('winnerId', ParseIntPipe) winnerId: number,
  ) {
    return this.tournamentsService.updateWinner(tournamentId, winnerId);
  }

  @Get(':tournamentId/active-teams')
  @ApiOperation({ summary: 'Get active teams of a tournament with pagination' })
  @ApiParam({ name: 'tournamentId', type: 'number', description: 'ID of the tournament' })
  @ApiQuery({ name: 'page', type: 'number', required: false, description: 'Page number for pagination', example: 1 })
  @ApiQuery({ name: 'limit', type: 'number', required: false, description: 'Number of items per page', example: 10 })
  @ApiResponse({ status: 200, description: 'Filtered list of active teams retrieved successfully.' })
  async getActiveTeamsByTournament(
    @Param('tournamentId', ParseIntPipe) tournamentId: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.tournamentsService.findTeamsByTournamentWithFilter(tournamentId, page, limit);
  }

}
