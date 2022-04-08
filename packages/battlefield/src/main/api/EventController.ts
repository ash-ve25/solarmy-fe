import {Controller} from "@nestjs/common";
import {EventPattern} from "@nestjs/microservices";
import {UnitEnqueuedEvent} from "@solar/service-provider";
import {Battlefield} from "../domain/Battlefield";

@Controller()
export class EventController {

    constructor(
        private readonly battlefield: Battlefield
    ) {}

    @EventPattern(UnitEnqueuedEvent.EventName)
    async checkUnit(context: UnitEnqueuedEvent) {
        return this.battlefield.dequeueUnitCheck(context);
    }
}
