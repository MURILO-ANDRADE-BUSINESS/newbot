import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    PrimaryColumn,
    OneToOne,
    ManyToOne,
} from 'typeorm';

import { EventLineup } from './EventLineup';
import { EventOdds } from './EventOdds';
import { EventWeatherData } from './EventWeatherData';
import { UpcomingEventOdds } from './UpcomingEventOdds';

@Entity('upcoming_events')
export class UpcomingEvent {
    @PrimaryColumn()
    id: string;

    @Column('json')
    data: any;

    @Column()
    time: number;

    @Column({ nullable: true })
    leagueId: string;

    @OneToOne(() => EventLineup, lineup => lineup.upcomingEvent)
    lineup?: EventLineup;

    @OneToOne(() => UpcomingEventOdds, odds => odds.event)
    odds?: UpcomingEventOdds;
}
