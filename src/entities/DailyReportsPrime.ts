import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('daily_reports_prime')
export class DailyReportPrime {
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
