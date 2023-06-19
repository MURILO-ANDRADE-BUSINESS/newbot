import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    PrimaryColumn,
    OneToOne,
} from 'typeorm';

import { Event } from './Event';
import { UpcomingEvent } from './UpcomingEvent';

@Entity('event_lineup')
export class EventLineup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    eventId: string;

    @OneToOne(() => Event, event => event.lineup)
    event: Event;

    @OneToOne(() => UpcomingEvent, upcomingEvent => upcomingEvent.lineup)
    upcomingEvent: UpcomingEvent;

    @Column('json')
    data: any;
}
