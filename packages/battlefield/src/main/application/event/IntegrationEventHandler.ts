import {EventsHandler, IEventHandler} from "@nestjs/cqrs";
import {IntegrationEventBus, UnitDeployedEvent, UnitEnqueuedEvent} from "@solar/service-provider";

@EventsHandler(
    UnitDeployedEvent,
    UnitEnqueuedEvent
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
