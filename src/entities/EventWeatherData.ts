import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    PrimaryColumn,
    OneToOne,
} from 'typeorm';

import { Event } from './Event';

@Entity('event_weather_data')
export class EventWeatherData {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    eventId: string;

    @OneToOne(() => Event, event => event.weather)
    event: Event;

    @Column('json')
    data: any;
}
