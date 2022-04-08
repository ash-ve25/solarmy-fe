import {ClientProxyFactory} from "@nestjs/microservices";
import {ClientProxy} from "@nestjs/microservices/client/client-proxy";
import {GenerateSignInCodeCommand, SignInCommand, SignUpCommand,} from "./command";
import {ClientOptions} from "@nestjs/microservices/interfaces/client-metadata.interface";

export class AuthServer {

    constructor(
        private client: ClientProxy
    ) {
    }

    signUp(context: SignUpCommand) {
        return this.client.send(SignUpCommand.CommandName, context);
    }

    signIn(context: SignInCommand) {
        return this.client.send(SignInCommand.CommandName, context)
    }

    generateSignInCode(context: GenerateSignInCodeCommand) {
        return this.client.send(GenerateSignInCodeCommand.CommandName, context)
    }

    static provideClient(options: ClientOptions) {
        return {
            provide: AuthServer,
            useFactory: () => new AuthServer(ClientProxyFactory.create(options))
        }
    }
}
