import {IsNotEmpty, IsString} from "class-validator";

export class SignUpCommand {

    static CommandName = 'command.signUp';

    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    readonly signature: string;

    constructor(username: string, signature: string) {
        this.signature = signature;
        this.username = username;
    }

    static build(context: SignUpCommand) {
        const {
            signature,
            username
        } = context;

        return new SignUpCommand(username, signature);
    }
}
