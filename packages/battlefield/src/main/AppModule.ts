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
import {Battlefield} from "./domain/Battlefield";
import {QueryController} from "./api/QueryController";
import {CommandController} from "./api/CommandController";
import {DeployUnitCommandHandler} from "./application/command/DeployUnitCommandHandler";
import {IntegrationEventHandler} from "./application/event/IntegrationEventHandler";
import {DeployedUnitQueryHandler} from "./application/query/DeployedUnitQueryHandler";
import {HttpModule} from "@nestjs/axios";
import {DelistUnitCommandHandler} from "./application/command/DelistUnitCommandHandler";
import {EnqueueUnitChecksCommandHandler} from "./application/command/EnqueueUnitChecksCommandHandler";
import {EventController} from "./api/EventController";
import {DeployedUnitsQueryHandler} from "./application/query/DeployedUnitsQueryHandler";
import {ReleaseUnitsCommandHandler} from "./application/command/ReleaseUnitsCommandHandler";
import { ClaimUnitCommandHandler } from "application/command/ClaimUnitCommandHandler";

@Module({
    imports: [
        CqrsModule,
        TerminusModule,
        HttpModule,

        TypeOrmModule.forRoot(<any>Config.db),
        TypeOrmModule.forFeature([
            UnitRepository
        ])
    ],

    providers: [
        Battlefield,

        UnitDAO,

        DeployUnitCommandHandler,
        DelistUnitCommandHandler,
        EnqueueUnitChecksCommandHandler,
        ClaimUnitCommandHandler,
        ReleaseUnitsCommandHandler,
        IntegrationEventHandler,
        DeployedUnitQueryHandler,
        DeployedUnitsQueryHandler,

        ValidationPipe.providePipe(),

        EntityNotFoundFilter.provideFilter(),

        Blockchain.provideClient(Config.service.blockchain),
        IntegrationEventBus.provideClient(Config.amq)
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
