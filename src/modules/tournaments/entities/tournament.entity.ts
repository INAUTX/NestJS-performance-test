import { Match } from '../../matchs/entities/match.entity';
import { Team } from '../../teams/entities/team.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity('tournaments')
export class Tournament {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Team, (team) => team.tournament)
  teams: Team[];

  @OneToMany(() => Match, (match) => match.tournament)
  matches: Match[];

  @ManyToOne(() => Team, { nullable: true })
  winner: Team;
}
