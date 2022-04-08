import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {Blockchain} from "../../domain/Blockchain";
import {SendAmmoCommand} from "@solar/service-provider";

@CommandHandler(SendAmmoCommand)
export class SendAmmoCommandHandler implements ICommandHandler {

    constructor(
        private service: Blockchain
    ) {
    }

    execute(command: SendAmmoCommand) {
        return this.service.enqueueSendAmmo(command);
    }
}
