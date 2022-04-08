import {IEvent} from "@nestjs/cqrs";
import {IsNotEmpty, IsString} from "class-validator";

export class UnitEnqueuedEvent implements IEvent {

    static EventName = 'event.unit.enqueued';

    readonly eventName? = UnitEnqueuedEvent.EventName;

    @IsString()
    @IsNotEmpty()
    readonly unitIds: string[];

    @IsString()
    @IsNotEmpty()
    readonly accountId: string

    constructor(unitIds: string[], accountId: string) {
        this.unitIds = unitIds;
        this.accountId = accountId;
    }

    static build(context: UnitEnqueuedEvent) {
        const {unitIds, accountId} = context;

        return new UnitEnqueuedEvent(unitIds, accountId);
    }
}
