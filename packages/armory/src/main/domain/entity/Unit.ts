import {Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from "typeorm";
import {v4 as generateUuid} from 'uuid';
import {InvalidArgumentError, UnitCreatedEvent} from "@solar/service-provider";

@Entity()
export class Unit {

    @PrimaryColumn("uuid")
    id: string = generateUuid();

    @Column({
        nullable: false
    })
    accountId: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    name: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    address: string;

    @Column({
        type: 'int8',
        nullable: false,
        default: 0
    })
    points: number;

    @Column({
        type: 'boolean',
        nullable: false,
        default: true
    })
    isMint: boolean = true;

    @Column({
        type: 'boolean',
        nullable: false,
        default: false
    })
    is3d: boolean = false;

    @Column({
        type: 'int8',
        nullable: false,
        default: 0
    })
    rank: number;

    @Column({name: 'data_uri'})
    dataUri: string;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    static create(context) {
        const {
            accountId,
            address,
            name,
            symbol,
            uri
        } = context;

        InvalidArgumentError.ifThrow(!accountId, 'Account id is required for unit');

        const u = new Unit();

        u.accountId = accountId;
        u.name = name;
        u.address = address;
        u.dataUri = uri;

        return {
            result: u,
            events: [UnitCreatedEvent.build({
                unitId: u.id
            })]
        }
    }
}
