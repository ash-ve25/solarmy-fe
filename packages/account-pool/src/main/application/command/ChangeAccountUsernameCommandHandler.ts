import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {ChangeAccountUsernameCommand} from "@solar/service-provider";
import {AccountPool} from "../../domain/AccountPool";

@CommandHandler(ChangeAccountUsernameCommand)
export class ChangeAccountUsernameCommandHandler implements ICommandHandler {

    constructor(
        private service: AccountPool
    ) {
    }

    execute(command: ChangeAccountUsernameCommand) {
        return this.service.changeAccountUsername(command);
    }
}
