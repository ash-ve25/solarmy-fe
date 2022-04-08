import {IEvent} from "@nestjs/cqrs";
import {IsNotEmpty, IsString} from "class-validator";

export class UnitDeployedEvent implements IEvent {

    static EventName = 'event.unit.deployed';

    readonly eventName? = UnitDeployedEvent.EventName;

    @IsString()
    @IsNotEmpty()
    readonly unitId: string;

    constructor(unitId: string) {
        this.unitId = unitId;
    }

    static build(context: UnitDeployedEvent) {
        const {unitId} = context;

        return new UnitDeployedEvent(unitId);
    }
}
