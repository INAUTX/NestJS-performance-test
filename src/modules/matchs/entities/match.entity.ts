import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Team } from '../../teams/entities/team.entity';
import { Tournament } from '../../tournaments/entities/tournament.entity';

@Entity('matches')
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team, { nullable: false })
  teamOne: Team;

  @ManyToOne(() => Team, { nullable: false })
  teamTwo: Team;

  @ManyToOne(() => Tournament, (tournament) => tournament.matches, { nullable: false })
  tournament: Tournament;

  @Column({ type: 'boolean', default: false })
  isCompleted: boolean; 
}
