import {EventsHandler, IEventHandler} from "@nestjs/cqrs";
import {IntegrationEventBus, UnitCreatedEvent} from "@solar/service-provider";

@EventsHandler(
    UnitCreatedEvent,
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
