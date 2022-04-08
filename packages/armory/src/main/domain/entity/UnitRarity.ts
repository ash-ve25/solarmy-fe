import {Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class UnitRarity {

    @PrimaryColumn()
    id: string;

    @Column({type: 'boolean'})
    is2d: boolean;

    @Column({type: 'json'})
    data: Object;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    static create2d(context) {
        return UnitRarity.create({
            data: context,
            is2d: true
        })
    }

    static create3d(context) {
        return UnitRarity.create({
            data: context,
            is2d: false
        })
    }

    static create(context) {
        const {data, is2d} = context;
        const {mint} = data;

        const e = new UnitRarity();

        e.id = mint;
        e.data = data
        e.is2d = is2d;

        return {
            result: e,
            events: []
        }
    }
}
