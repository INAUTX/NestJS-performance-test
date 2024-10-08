import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { ApiOperation, ApiResponse, ApiParam, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new team' })
  @ApiBody({ type: CreateTeamDto })
  @ApiResponse({ status: 201, description: 'Team created successfully.' })

  async createTeam(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.createTeam(createTeamDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all teams' })
  @ApiResponse({ status: 200, description: 'List of all teams retrieved successfully.' })
  async getAllTeams() {
    return this.teamsService.findAllTeams();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get team by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the team' })
  @ApiResponse({ status: 200, description: 'Team retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Team not found.' })
  async getTeamById(@Param('id', ParseIntPipe) id: number) {
    return this.teamsService.findTeamById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updating a team by ID and changing the tournament' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the team' })
  @ApiBody({ type: UpdateTeamDto })
  @ApiResponse({ status: 200, description: 'Team updated successfully.' })
  @ApiResponse({ status: 404, description: 'Team or tournament not found.' })
  async updateTeam(@Param('id', ParseIntPipe) id: number, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.updateTeam(id, updateTeamDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a team by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the team' })
  @ApiResponse({ status: 204, description: 'Team deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Team not found.' })
  async deleteTeam(@Param('id', ParseIntPipe) id: number) {
    await this.teamsService.deleteTeam(id);
  }
}
