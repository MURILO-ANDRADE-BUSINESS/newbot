import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Afiliate } from './afiliates';

export enum Type {
    sale,
    refund,
}
@Entity('sales')
class Sale {
    @PrimaryColumn()
    id?: string;

    @Column('float')
    affiliateValue: number;

    @Column()
    userId: string;

    @Column('datetime')
    date: any;

    @Column()
    invoice: string;

    @Column()
    product: string;

    @Column('float')
    value: number;

    @Column({ default: Type.sale })
    status: boolean;

    @ManyToOne(() => Afiliate, Afiliate => Afiliate.id)
    afiliate: Afiliate;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Sale };
