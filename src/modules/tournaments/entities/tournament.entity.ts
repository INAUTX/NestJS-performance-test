import { Team } from 'src/modules/teams/entities/team.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity('tournaments')
export class Tournament {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Team, (team) => team.tournament)
  teams: Team[];

  @ManyToOne(() => Team, { nullable: true })
  winner: Team;
}
