import {IEvent} from "@nestjs/cqrs";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class SendAmmoEnqueuedEvent implements IEvent {

    static EventName = 'event.sendAmmo.enqueued';

    readonly eventName? = SendAmmoEnqueuedEvent.EventName;

    @IsString()
    @IsNotEmpty()
    readonly walletAddress: string;

    @IsNumber()
    @IsNotEmpty()
    readonly amount: number;

    constructor(walletAddress: string, amount: number) {
        this.walletAddress = walletAddress;
        this.amount = amount;
    }

    static build(context: SendAmmoEnqueuedEvent) {
        const {walletAddress, amount} = context;

        return new SendAmmoEnqueuedEvent(walletAddress, amount);
    }
}
