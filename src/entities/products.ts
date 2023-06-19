import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('products')
class Product {
    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    eduzzId: string;

    @Column()
    braipId: string;

    @Column()
    kiwifiId: string;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Product };
