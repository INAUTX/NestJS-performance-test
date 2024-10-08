import { Team } from '../../teams/entities/team.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 0 })
  goals: number;

  @ManyToOne(() => Team, (team) => team.players, { onDelete: 'CASCADE' })
  team: Team;
}
