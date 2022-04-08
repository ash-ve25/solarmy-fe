import {BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from "typeorm";
import {AccountCreatedEvent, AccountUsernameChangedEvent, InvalidArgumentError} from "@solar/service-provider";

@Entity()
export class Account {

    @PrimaryColumn()
    id: string;

    @Column()
    username: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @BeforeUpdate()
    beforeUpdate() {
        this.updatedAt = new Date();
    }

    changeUsername(username) {
        InvalidArgumentError.ifThrow(this.username == username, 'Username is same');

        this.username = username;

        return [
            AccountUsernameChangedEvent.build({
                accountId: this.id,
                username
            })
        ]
    }

    static create(context) {
        const {
            username,
        } = context;

        const a = new Account();

        a.id = username;
        a.username = username;

        return {
            result: a,
            event: AccountCreatedEvent.build({
                accountId: a.id
            })
        };
    }
}
