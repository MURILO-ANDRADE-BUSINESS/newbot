import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    PrimaryColumn,
    OneToOne,
} from 'typeorm';

import { Event } from './Event';

@Entity('event_odds')
export class EventOdds {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    eventId: string;

    @OneToOne(() => Event, event => event.odds)
    event: Event;

    @Column('json')
    data?: any;
}
