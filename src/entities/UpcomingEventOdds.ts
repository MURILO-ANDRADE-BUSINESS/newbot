import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    PrimaryColumn,
    OneToOne,
} from 'typeorm';

import { Event } from './Event';
import { UpcomingEvent } from './UpcomingEvent';

@Entity('upcoming_events_odds')
export class UpcomingEventOdds {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    eventId: string;

    @OneToOne(() => UpcomingEvent, event => event.odds)
    event: UpcomingEvent;

    @Column('json')
    data: any;
}
