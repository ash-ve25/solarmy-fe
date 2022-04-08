import {IEvent} from "@nestjs/cqrs";

export class SignedInEvent implements IEvent {

    static EventName = 'event.signedIn';

    readonly eventName? = SignedInEvent.EventName;

    constructor(
        readonly username: string
    ) {
    }

    static build(context: SignedInEvent) {
        const {username} = context;

        return new SignedInEvent(username);
    }
}
