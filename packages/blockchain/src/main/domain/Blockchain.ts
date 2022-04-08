import {Injectable} from "@nestjs/common";
import {EventBus} from "@nestjs/cqrs";
import {SolanaAdapter} from "../infrastructure/SolanaAdapter";
import {SendAmmoEnqueuedEvent} from "@solar/service-provider";

@Injectable()
export class Blockchain {

    constructor(
        private readonly eventBus: EventBus,
        private readonly adapter: SolanaAdapter
    ) {
    }

    async createTransaction(context) {
        //TODO impl
    }

    async enqueueSendAmmo(context) {
        this.eventBus.publish(SendAmmoEnqueuedEvent.build(context));
    }

    async sendAmmo(context) {
        return this.adapter.sendAmmo(context);
    }
}
