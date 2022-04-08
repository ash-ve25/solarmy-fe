import {Module} from "@nestjs/common";
import {Config} from "./Config";
import {Blockchain} from "./domain/Blockchain";
import {CreateTransactionCommandHandler} from "./application/command/CreateTransactionCommandHandler";
import {CommandController} from "./api/CommandController";
import {AckInterceptor, HealthController, IntegrationEventBus} from "@solar/service-provider";
import {CqrsModule} from "@nestjs/cqrs";
import {TerminusModule} from "@nestjs/terminus";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TransactionRepository} from "./domain/repository/TransactionRepository";
import {SolanaAdapter} from "./infrastructure/SolanaAdapter";
import {QueryController} from "./api/QueryController";
import {AccountNFTsQueryHandler} from "./application/query/AccountNFTsQueryHandler";
import {SendAmmoCommandHandler} from "./application/command/SendAmmoCommandHandler";
import { IntegrationEventHandler } from "application/event/IntegrationEventHandler";
import {EventController} from "./api/EventController";

@Module({
    imports: [
        CqrsModule,
        TerminusModule,

        TypeOrmModule.forRoot(<any>Config.db),
        TypeOrmModule.forFeature([
            TransactionRepository
        ])
    ],

    providers: [
        CreateTransactionCommandHandler,
        AccountNFTsQueryHandler,
        SendAmmoCommandHandler,
        IntegrationEventHandler,

        Blockchain,

        SolanaAdapter.provideAdapter(Config.solana),
        IntegrationEventBus.provideClient(Config.amq),
        AckInterceptor.provideInterceptor()
    ],

    controllers: [
        CommandController,
        QueryController,
        EventController,

        HealthController
    ]
})
export class AppModule {
}
