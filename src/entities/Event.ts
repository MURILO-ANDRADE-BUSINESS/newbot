import { Entity, Column, PrimaryColumn, OneToOne } from 'typeorm';

import { EventLineup } from './EventLineup';
import { EventOdds } from './EventOdds';
import { EventWeatherData } from './EventWeatherData';

@Entity('events')
export class Event {
    @PrimaryColumn()
    id: string;

    @OneToOne(() => EventLineup, lineup => lineup.event)
    lineup: EventLineup;

    @OneToOne(() => EventWeatherData, weather => weather.event)
    weather: EventWeatherData;

    @OneToOne(() => EventOdds, odds => odds.event)
    odds: EventOdds;

    @Column({ nullable: true })
    leagueId: string;

    @Column('json', { nullable: true })
    homePreviousEvents?: any[];

    @Column('json', { nullable: true })
    awayPreviousEvents?: any[];

    @Column('json')
    data: any;

    @Column({ nullable: true })
    time: number;

    @Column({ nullable: true })
    messageId: number;

    @Column({ nullable: true })
    messagePrimeId: number;

    @Column({ nullable: true })
    isFinished: boolean;

    @Column({ nullable: true })
    goalsOnFirstHalf: number;
}
