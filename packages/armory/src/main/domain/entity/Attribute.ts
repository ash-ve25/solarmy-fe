import {Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from "typeorm";
import {v4 as generateUuid} from 'uuid';

@Entity()
export class Attribute {

    @PrimaryColumn("uuid")
    id: string = generateUuid();

    @Column({
        type: 'varchar',
        nullable: false
    })
    address: string;

    @Column({
        type: 'boolean',
        nullable: false,
        default: false
    })
    is3d: boolean = false;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    static create(context) {
    }
}
