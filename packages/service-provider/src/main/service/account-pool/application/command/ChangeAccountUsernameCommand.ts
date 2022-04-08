import {IsNotEmpty, IsString} from "class-validator";

export class ChangeAccountUsernameCommand {

    static CommandName = 'command.changeAccountUsername';

    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    readonly accountId: string;

    constructor(username: string, accountId: string) {
        this.username = username;
        this.accountId = accountId;
    }

    static build(context: ChangeAccountUsernameCommand) {
        const {
            username,
            accountId
        } = context;

        return new ChangeAccountUsernameCommand(username, accountId);
    }
}
