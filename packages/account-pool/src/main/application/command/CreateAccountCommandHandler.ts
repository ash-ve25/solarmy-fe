import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateAccountCommand} from "@solar/service-provider";
import {AccountPool} from "../../domain/AccountPool";

@CommandHandler(CreateAccountCommand)
export class CreateAccountCommandHandler implements ICommandHandler {

    constructor(
        private service: AccountPool
    ) {
    }

    execute(command: CreateAccountCommand) {
        return this.service.createAccount(command);
    }
}
