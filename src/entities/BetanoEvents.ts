import { Entity, Column, PrimaryColumn } from 'typeorm';

import { TeamBetano } from '../utils/types';

@Entity('betano_events')
export class BetanoEvent {
    @PrimaryColumn()
    id: string;

    @Column({ nullable: true })
    name: string;

    @Column('json', { nullable: true })
    home?: TeamBetano;

    @Column('json', { nullable: true })
    away?: TeamBetano;

    @Column({ nullable: true })
    date: number;

    @Column({ nullable: true })
    url: string;
}
