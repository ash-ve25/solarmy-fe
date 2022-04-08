import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {SignInCommand} from '@solar/service-provider';
import {AuthServer} from "../../domain/AuthServer";

@CommandHandler(SignInCommand)
export class SignInCommandHandler implements ICommandHandler {

    constructor(
        private service: AuthServer
    ) {
    }

    execute(command: SignInCommand) {
        return this.service.signIn(command);
    }
}
