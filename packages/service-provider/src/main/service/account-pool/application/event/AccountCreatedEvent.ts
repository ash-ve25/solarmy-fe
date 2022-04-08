import {IEvent} from "@nestjs/cqrs";

export class AccountCreatedEvent implements IEvent {

    static EventName = 'event.account.created';

    readonly eventName? = AccountCreatedEvent.EventName;

    constructor(
        readonly accountId: string
    ) {
    }

    static build(context: AccountCreatedEvent) {
        const {accountId} = context;

        return new AccountCreatedEvent(accountId);
    }
}
