import {IEvent} from "@nestjs/cqrs";
import {IsNotEmpty, IsString} from "class-validator";

export class DeployedUnitReleasedEvent implements IEvent {

    static EventName = 'event.deployedUnit.released';

    readonly eventName? = DeployedUnitReleasedEvent.EventName;

    @IsString()
    @IsNotEmpty()
    readonly unitId: string;

    constructor(unitId: string) {
        this.unitId = unitId;
    }

    static build(context: DeployedUnitReleasedEvent) {
        const {unitId} = context;

        return new DeployedUnitReleasedEvent(unitId);
    }
}
