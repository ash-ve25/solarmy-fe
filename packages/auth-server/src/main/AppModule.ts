import {Module} from "@nestjs/common";
import {Config} from "./Config";
import {AuthServer} from "./domain/AuthServer";
import Encryptor from "./infrastructure/Encryptor";
import {JwtModule} from "@nestjs/jwt";
import {SignInCommandHandler} from "./application/command/SignInCommandHandler";
import {CommandController} from "./api/CommandController";
import {AccountPool, HealthController} from "@solar/service-provider";
import {CqrsModule} from "@nestjs/cqrs";
import {TerminusModule} from "@nestjs/terminus";
import {GenerateSignInCodeCommandHandler} from "./application/command/GenerateSignInCodeCommandHandler";

@Module({
    imports: [
        CqrsModule,
        TerminusModule,

        JwtModule.register({
            secret: Config.jwt.token.secret
        }),
    ],

    providers: [
        SignInCommandHandler,
        GenerateSignInCodeCommandHandler,

        AuthServer,
        Encryptor,

        AccountPool.provideClient({options: Config.service.accountPool})
    ],

    controllers: [
        CommandController,

        HealthController
    ]
})
export class AppModule {
}
