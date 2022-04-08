import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Config} from "./Config";
import {CqrsModule} from "@nestjs/cqrs";
import {
    Blockchain,
    EntityNotFoundFilter,
    HealthController,
    IntegrationEventBus,
    ValidationPipe
} from "@solar/service-provider";
import {TerminusModule} from "@nestjs/terminus";
import {UnitRepository} from "./domain/repository/UnitRepository";
import {UnitDAO} from "./dao/UnitDAO";
import {Armory} from "./domain/Armory";
import {QueryController} from "./api/QueryController";
import {CommandController} from "./api/CommandController";
import {CreateUnitCommandHandler} from "./application/command/CreateUnitCommandHandler";
import {IntegrationEventHandler} from "./application/event/IntegrationEventHandler";
import {UnitQueryHandler} from "./application/query/UnitQueryHandler";
import {AccountUnitQueryHandler} from "./application/query/AccountUnitQueryHandler";
import {AccountUnitsQueryHandler} from "./application/query/AccountUnitsQueryHandler";
import {CollectUnitsCommandHandler} from "./application/command/CollectUnitsCommandHandler";
import {CollectRarityCommandHandler} from "./application/command/CollectRarityCommandHandler";
import {HttpModule} from "@nestjs/axios";
import {HowIsRare} from "./infrastructure/HowIsRare";
import {UnitRarityRepository} from "./domain/repository/UnitRarityRepository";
import {UnitRarityDAO} from "./dao/UnitRarityDAO";
import {UnitRarityQueryHandler} from "./application/query/UnitRarityQueryHandler";

@Module({
    imports: [
        CqrsModule,
        TerminusModule,
        HttpModule,

        TypeOrmModule.forRoot(<any>Config.db),
        TypeOrmModule.forFeature([
            UnitRepository,
            UnitRarityRepository
        ])
    ],

    providers: [
        Armory,
        HowIsRare,

        UnitDAO,
        UnitRarityDAO,

        CreateUnitCommandHandler,
        CollectUnitsCommandHandler,
        CollectRarityCommandHandler,
        IntegrationEventHandler,
        UnitQueryHandler,
        AccountUnitQueryHandler,
        AccountUnitsQueryHandler,
        UnitRarityQueryHandler,

        ValidationPipe.providePipe(),

        EntityNotFoundFilter.provideFilter(),

        Blockchain.provideClient(Config.service.blockchain),
        IntegrationEventBus.provideClient(Config.amq)
    ],

    controllers: [
        CommandController,
        QueryController,
        HealthController
    ]
})
export class AppModule {
}
