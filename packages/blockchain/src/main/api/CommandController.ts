import {Controller} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {MessagePattern} from "@nestjs/microservices";
import {CreateTransactionCommand, SendAmmoCommand} from "@solar/service-provider";

@Controller()
export class CommandController {

    constructor(
        private commandBus: CommandBus
    ) {
    }

    @MessagePattern(CreateTransactionCommand.CommandName)
    createTransaction(context: CreateTransactionCommand) {
        return this.commandBus.execute(CreateTransactionCommand.build(context));
    }

    @MessagePattern(SendAmmoCommand.CommandName)
    sendAmmo(context: SendAmmoCommand) {
        return this.commandBus.execute(SendAmmoCommand.build(context));
    }
}
