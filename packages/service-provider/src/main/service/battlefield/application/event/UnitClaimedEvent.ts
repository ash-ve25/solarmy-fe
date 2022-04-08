import {IEvent} from "@nestjs/cqrs";
import {IsNotEmpty, IsString} from "class-validator";

export class UnitClaimedEvent implements IEvent {

    static EventName = 'event.unit.claimed';

    readonly eventName? = UnitClaimedEvent.EventName;

    @IsString()
    @IsNotEmpty()
    readonly unitId: string;

    constructor(unitId: string) {
        this.unitId = unitId;
    }

    static build(context: UnitClaimedEvent) {
        const {unitId} = context;

        return new UnitClaimedEvent(unitId);
    }
}
