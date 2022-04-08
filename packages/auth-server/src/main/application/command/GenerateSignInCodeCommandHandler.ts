import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {GenerateSignInCodeCommand} from '@solar/service-provider';
import {AuthServer} from "../../domain/AuthServer";

@CommandHandler(GenerateSignInCodeCommand)
export class GenerateSignInCodeCommandHandler implements ICommandHandler {

    constructor(
        private service: AuthServer
    ) {
    }

    async execute(command: GenerateSignInCodeCommand) {
        return this.service.generateSignInCode(command);
    }
}
