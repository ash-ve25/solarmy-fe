import {SignUpCommand} from "./SignUpCommand";

export class SignInCommand extends SignUpCommand {

    static CommandName = 'command.signIn';

    static build(context: SignUpCommand) {
        const {
            signature,
            username
        } = context;

        return new SignInCommand(username, signature);
    }
}
