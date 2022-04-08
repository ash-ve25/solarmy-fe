import {IsNotEmpty, IsString} from "class-validator";

export class GenerateSignInCodeCommand {

    static CommandName = 'command.generateSignInCode';

    @IsString()
    @IsNotEmpty()
    readonly username: string;

    constructor(username: string) {
        this.username = username;
    }

    static build(context: GenerateSignInCodeCommand) {
        const {
            username
        } = context;

        return new GenerateSignInCodeCommand(username);
    }
}
