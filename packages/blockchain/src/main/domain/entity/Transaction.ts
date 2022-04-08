import {AfterLoad, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from "typeorm";
import {v4 as generateUuid} from "uuid";

@Entity()
export class Transaction {

    @PrimaryColumn()
    id: string = generateUuid();

    @Column({
        type: 'json'
    })
    data: string;

    @Column({
        type: "boolean",
        default: false
    })
    isSent: boolean = false

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @AfterLoad()
    afterLoad() {
        this.data = JSON.parse(this.data);
    }

    send() {
        this.isSent = true;
    }

    static create(context) {
        const {data} = context;

        const t = new Transaction();

        t.data = data;

        return {
            result: t,
            events: []
        }
    }
}
