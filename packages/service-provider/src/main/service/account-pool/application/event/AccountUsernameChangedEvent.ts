import {IEvent} from "@nestjs/cqrs";
import {IsNotEmpty, IsString} from "class-validator";

export class AccountUsernameChangedEvent implements IEvent {

    static EventName = 'event.accountUsername.changed';

    readonly eventName? = AccountUsernameChangedEvent.EventName;

    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    readonly accountId: string;

    constructor(accountId: string, username: string) {
        this.accountId = accountId;
        this.username = username
    }

    static build(context: AccountUsernameChangedEvent) {
        const {accountId, username} = context;

        return new AccountUsernameChangedEvent(accountId, username);
    }
}
