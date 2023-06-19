import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('daily_reports')
export class DailyReport {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    date: Date;

    @Column()
    greens: number;

    @Column()
    reds: number;

    @Column()
    total: number;
}
