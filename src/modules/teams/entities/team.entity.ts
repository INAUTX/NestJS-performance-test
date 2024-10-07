import { Player } from 'src/modules/players/entities/player.entity';
import { Tournament } from 'src/modules/tournaments/entities/tournament.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;  // Indicates whether the team is still participating in the tournament.

  @Column({ type: 'int', default: 0 })
  points: number; // Points earned by the team in the tournament.

  @OneToMany(() => Player, (player) => player.team)
  players: Player[];

  @ManyToOne(() => Tournament, (tournament) => tournament.teams, { onDelete: 'CASCADE' })
  tournament: Tournament;
}