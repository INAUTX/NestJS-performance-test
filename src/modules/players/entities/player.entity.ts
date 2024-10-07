import { Team } from 'src/modules/teams/entities/team.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Team, (team) => team.players, { onDelete: 'CASCADE' })
  team: Team;
}
