import { Controller, Post, Param, ParseIntPipe, Patch, Body, Query, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiTags, ApiBody, ApiQuery } from '@nestjs/swagger';
import { MatchesService } from './matchs.service';

@ApiTags('Matches')
@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Post('create-matches/:tournamentId')
  @ApiOperation({ summary: 'Create 1vs1 matches for a tournament' })
  @ApiParam({ name: 'tournamentId', type: 'number', description: 'ID of the tournament' })
  @ApiResponse({ status: 201, description: 'Matches created successfully and the unmatched team identified.' })
  async createMatchesForTournament(@Param('tournamentId', ParseIntPipe) tournamentId: number) {
    return this.matchesService.createMatchesForTournament(tournamentId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all matches' })
  @ApiResponse({ status: 200, description: 'List of all matches retrieved successfully.' })
  async getAllMatches() {
    return this.matchesService.findAllMatches();
  }

  @Get('completed')
  @ApiOperation({ summary: 'Get completed matches with pagination' })
  @ApiQuery({ name: 'page', type: 'number', required: false, description: 'Page number for pagination', example: 1 })
  @ApiQuery({ name: 'limit', type: 'number', required: false, description: 'Number of items per page', example: 10 })
  @ApiResponse({ status: 200, description: 'List of completed matches retrieved successfully.' })
  async getCompletedMatches(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.matchesService.findCompletedMatches(page, limit);
  }

  @Patch(':matchId/completion-status')
  @ApiOperation({ summary: 'Update the completion status of a match' })
  @ApiParam({ name: 'matchId', type: 'number', description: 'ID of the match' })
  @ApiBody({ schema: { properties: { isCompleted: { type: 'boolean', example: true } } } })
  @ApiResponse({ status: 200, description: 'Match completion status updated successfully.' })
  @ApiResponse({ status: 404, description: 'Match not found.' })
  async updateMatchCompletionStatus(
    @Param('matchId', ParseIntPipe) matchId: number,
    @Body('isCompleted') isCompleted: boolean,
  ) {
    return this.matchesService.updateMatchCompletionStatus(matchId, isCompleted);
  }
}
