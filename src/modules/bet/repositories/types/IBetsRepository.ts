import { BetanoEvent } from '../../../../entities/BetanoEvents';
import { DailyReport } from '../../../../entities/DailyReport';
import { Event } from '../../../../entities/Event';
import { EventLineup } from '../../../../entities/EventLineup';
import { EventWeatherData } from '../../../../entities/EventWeatherData';
import { Message } from '../../../../entities/Message';
import { UpcomingEvent } from '../../../../entities/UpcomingEvent';
import { UpcomingEventOdds } from '../../../../entities/UpcomingEventOdds';

export interface IUserRepositoryCreate {
    name: string;
    email: string;
    phone: string;
    document: string;
    birthday: any;
    instagram: string;
    zipcode: string;
    address: string;
    district: string;
    state: string;
    city: string;
    secret: boolean;
    password: string;
}
export interface IUserFindDTO {
    email: string;
    platform: string;
}
interface IFindUserbyEmailDTO {
    email: string;
}
export interface IUpdateUserById {
    id: string;
    property: string;
    value: string;
}
export interface IUpcommingEventsRepository {
    getUpcomingEventFromDB(id: string): Promise<UpcomingEvent>;
    create(data: any): Promise<UpcomingEvent>;
}
export interface IUpcommingEventsOddsRepository {
    getUpcomingEventOddsFromDB(id: number): Promise<UpcomingEventOdds>;
    create(data: any): Promise<UpcomingEventOdds>;
}
export interface IUpcommingEventsBetanoRepository {
    getUpcomingEventFromDB(id: number): Promise<BetanoEvent[]>;
    create(data: any): Promise<BetanoEvent>;
    clear(): Promise<boolean>;
}
export interface IEventsRepository {
    getEventFromDB(id: string): Promise<Event>;
    create(data: any): Promise<Event>;
    EventsBetweenDatesFilter(
        upperLimit: number,
        lowerLimit: number,
    ): Promise<Event[]>;
    unfinishedEventsFilter(
        upperLimit: number,
        lowerLimit: number,
    ): Promise<Event[]>;
}
export interface IMessagesRepository {
    getFromDB(id: number): Promise<Message>;
    create(data: any): Promise<Message>;
}
export interface IDailyReportsRepository {
    getFromDB(id: number): Promise<DailyReport>;
    create(data: any): Promise<DailyReport>;
    betweenDatesFilter(
        upperLimit: Date,
        lowerLimit: Date,
    ): Promise<DailyReport[]>;
}
export interface IEventLineUpRepository {
    getFromDB(id: number): Promise<EventLineup>;
    create(data: any): Promise<EventLineup>;
}
export interface IEventOddsRepository {
    getFromDB(id: number): Promise<EventLineup>;
    create(data: any): Promise<EventLineup>;
}

export interface IEventWeatherRepository {
    getFromDB(id: number): Promise<EventWeatherData>;
    create(data: any): Promise<EventWeatherData>;
}
export interface IDailyReportsPrimeRepository {
    getFromDB(id: number): Promise<DailyReport>;
    create(data: any): Promise<DailyReport>;
    betweenDatesFilter(
        upperLimit: Date,
        lowerLimit: Date,
    ): Promise<DailyReport[]>;
}
