import {EventsHandler, IEventHandler} from "@nestjs/cqrs";
import {AccountCreatedEvent, AccountUsernameChangedEvent, IntegrationEventBus} from "@solar/service-provider";

@EventsHandler(
    AccountCreatedEvent,
    AccountUsernameChangedEvent
)
export class IntegrationEventHandler implements IEventHandler {

    constructor(
        private eventBus: IntegrationEventBus
    ) {
    }

    handle(event) {
        const {eventName, ...others} = event;

        this.eventBus.emit(eventName, others);
    }
}
