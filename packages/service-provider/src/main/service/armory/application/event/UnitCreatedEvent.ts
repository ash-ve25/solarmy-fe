import {IEvent} from "@nestjs/cqrs";
import {IsUUID} from "class-validator";

export class UnitCreatedEvent implements IEvent {

    static EventName = 'event.unit.created';

    readonly eventName? = UnitCreatedEvent.EventName;

    @IsUUID(4)
    readonly unitId: string;

    constructor(unitId: string) {
        this.unitId = unitId;
    }

    static build(context: UnitCreatedEvent) {
        const {unitId} = context;

        return new UnitCreatedEvent(unitId);
    }
}
