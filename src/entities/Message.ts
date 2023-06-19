import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('messages')
export class Message {
    @PrimaryColumn()
    id: number;

    @Column('json', { nullable: true })
    text: any;
}
