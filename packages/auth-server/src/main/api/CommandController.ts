import {Controller} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {MessagePattern} from "@nestjs/microservices";
import {SignInCommand, GenerateSignInCodeCommand} from "@solar/service-provider";

@Controller()
export class CommandController {

    constructor(
        private commandBus: CommandBus
    ) {
    }

    @MessagePattern(SignInCommand.CommandName)
    signInCommand(context: SignInCommand) {
        return this.commandBus.execute(SignInCommand.build(context));
    }

    @MessagePattern(GenerateSignInCodeCommand.CommandName)
    generateSignInCodeCommand(context: GenerateSignInCodeCommand) {
        return this.commandBus.execute(GenerateSignInCodeCommand.build(context));
    }
}
