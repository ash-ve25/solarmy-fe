import {EventsHandler, IEventHandler} from "@nestjs/cqrs";
import {IntegrationEventBus, SendAmmoEnqueuedEvent} from "@solar/service-provider";

@EventsHandler(
    SendAmmoEnqueuedEvent,
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
