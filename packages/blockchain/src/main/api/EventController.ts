import {Controller} from "@nestjs/common";
import {EventPattern} from "@nestjs/microservices";
import {SendAmmoEnqueuedEvent} from "@solar/service-provider";
import {Blockchain} from "../domain/Blockchain";
import {setTimeout} from 'timers/promises';
import {Config} from "../Config";

@Controller()
export class EventController {

    private readonly throttle: number = Config.solana.sendAmmoThrottleTime;

    constructor(
        private readonly service: Blockchain
    ) {
    }

    @EventPattern(SendAmmoEnqueuedEvent.EventName)
    async sendAmmoEnqueued(context: SendAmmoEnqueuedEvent) {
        await setTimeout(this.throttle);

        return this.service.sendAmmo(context);
    }
}
