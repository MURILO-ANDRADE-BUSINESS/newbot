import {
    Column,
    Entity,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
// import { v4 as uuidV4 } from 'uuid';

// import { Sale } from './sales';

export enum Role {
    admin,
    user,
}
@Entity('users')
class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    password: string;

    @Column({ default: Role.user })
    role: Role;

    @Column({ default: true })
    active?: boolean;

    @Column({ default: false })
    virtual?: boolean;

    @Column({ default: true })
    fut?: boolean;

    @Column({ default: false })
    jogadorCaro?: boolean;

    @Column({ default: false })
    manualPrime?: boolean;

    @Column({ nullable: true })
    dueDate?: Date;

    @Column({ nullable: true })
    mjcDate?: Date;
}

export { User };
