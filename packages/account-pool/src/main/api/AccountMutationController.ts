import {Controller} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {MessagePattern} from "@nestjs/microservices";
import {ChangeAccountUsernameCommand, CreateAccountCommand} from "@solar/service-provider";

@Controller()
export class AccountMutationController {

    constructor(
        private commandBus: CommandBus
    ) {
    }

    @MessagePattern(CreateAccountCommand.CommandName)
    createAccount(context: CreateAccountCommand) {
        return this.commandBus.execute(context);
    }

    @MessagePattern(ChangeAccountUsernameCommand.CommandName)
    changeAccountUsername(context: ChangeAccountUsernameCommand) {
        return this.commandBus.execute(context);
    }
}
