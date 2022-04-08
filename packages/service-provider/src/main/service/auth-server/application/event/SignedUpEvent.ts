import {IEvent} from "@nestjs/cqrs";

export class SignedUpEvent implements IEvent {

    static EventName = 'event.signedUp';

    readonly eventName? = SignedUpEvent.EventName;

    constructor(
        readonly username: string
    ) {
    }

    static build(context: SignedUpEvent) {
        const {username} = context;

        return new SignedUpEvent(username);
    }
}
