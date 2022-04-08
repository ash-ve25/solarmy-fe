import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {Blockchain} from "../../domain/Blockchain";
import {CreateTransactionCommand} from "@solar/service-provider";

@CommandHandler(CreateTransactionCommand)
export class CreateTransactionCommandHandler implements ICommandHandler {

    constructor(
        private service: Blockchain
    ) {
    }

    execute(command: CreateTransactionCommand) {
        return this.service.createTransaction(command);
    }
}
