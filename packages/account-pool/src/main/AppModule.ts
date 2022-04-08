import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Config} from "./Config";
import {CqrsModule} from "@nestjs/cqrs";
import {IntegrationEventHandler} from "./application/event/IntegrationEventHandler";
import {EntityNotFoundFilter, HealthController, IntegrationEventBus, ValidationPipe} from "@solar/service-provider";
import {TerminusModule} from "@nestjs/terminus";
import {AccountRepository} from "./domain/repository/AccountRepository";
import {AccountPool} from "./domain/AccountPool";
import {AccountMutationController} from "./api/AccountMutationController";
import {CreateAccountCommandHandler} from "./application/command/CreateAccountCommandHandler";
import {AccountQueryController} from "./api/AccountQueryController";
import {AccountDAO} from "./dao/AccountDAO";
import {AccountQueryHandler} from "./application/query/AccountQueryHandler";
import {ChangeAccountUsernameCommandHandler} from "./application/command/ChangeAccountUsernameCommandHandler";

@Module({
    imports: [
        CqrsModule,
        TerminusModule,

        TypeOrmModule.forRoot(<any>Config.db),
        TypeOrmModule.forFeature([
            AccountRepository
        ])
    ],

    providers: [
        AccountPool,

        CreateAccountCommandHandler,
        ChangeAccountUsernameCommandHandler,
        AccountQueryHandler,

        IntegrationEventHandler,

        AccountDAO,

        ValidationPipe.providePipe(),

        EntityNotFoundFilter.provideFilter(),

        IntegrationEventBus.provideClient(Config.amq)
    ],

    controllers: [
        AccountMutationController,
        AccountQueryController,
        HealthController
    ]
})
export class AppModule {
}
