import {IsNotEmpty, IsString} from "class-validator";

export class CreateAccountCommand {

    static CommandName = 'command.createAccount';

    @IsString()
    @IsNotEmpty()
    readonly username: string;

    constructor(username: string) {
        this.username = username;
    }

    static build(context: CreateAccountCommand) {
        const {
            username,
        } = context;

        return new CreateAccountCommand(username);
    }
}
