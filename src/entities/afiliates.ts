import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Sale } from './sales';

@Entity('afiliates')
class Afiliate {
    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column({ nullable: true })
    document: string;

    @Column({ nullable: true })
    emailEduzz: string;

    @Column({ nullable: true })
    emailKiwifi: string;

    @Column({ nullable: true })
    emailBraip: string;

    @OneToMany(() => Sale, sales => sales.afiliate)
    sales: Sale[];

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Afiliate };
