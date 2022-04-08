import {IEvent} from "@nestjs/cqrs";
import {IsNotEmpty, IsString} from "class-validator";

export class UnitDelistedEvent implements IEvent {

    static EventName = 'event.unit.delisted';

    readonly eventName? = UnitDelistedEvent.EventName;

    @IsString()
    @IsNotEmpty()
    readonly unitId: string;

    constructor(unitId: string) {
        this.unitId = unitId;
    }

    static build(context: UnitDelistedEvent) {
        const {unitId} = context;

        return new UnitDelistedEvent(unitId);
    }
}
