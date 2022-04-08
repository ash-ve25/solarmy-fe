import {ClientProxyFactory} from "@nestjs/microservices";
import {ClientProxy} from "@nestjs/microservices/client/client-proxy";
import {ClientOptions} from "@nestjs/microservices/interfaces/client-metadata.interface";
import {
    ClaimUnitCommand,
    DelistUnitCommand,
    DeployUnitCommand,
    EnqueueUnitChecksCommand,
    ReleaseUnitsCommand
} from "./command";
import {DeployedUnitQuery, DeployedUnitsQuery} from "./query";

export class Battlefield {

    constructor(
        private client: ClientProxy
    ) {
    }

    deployUnit(context: DeployUnitCommand) {
        return this.client.send(DeployUnitCommand.CommandName, context);
    }

    delistUnit(context: DelistUnitCommand) {
        return this.client.send(DelistUnitCommand.CommandName, context);
    }

    claimUnit(context: ClaimUnitCommand) {
        return this.client.send(ClaimUnitCommand.CommandName, context);
    }

    enqueueUnitChecks() {
        return this.client.send(EnqueueUnitChecksCommand.CommandName, {});
    }

    releaseUnits() {
        return this.client.send(ReleaseUnitsCommand.CommandName, {});
    }

    findUnit(context: DeployedUnitQuery) {
        return this.client.send(DeployedUnitQuery.QueryName, context);
    }

    findUnits(context: DeployedUnitsQuery) {
        return this.client.send(DeployedUnitsQuery.QueryName, context);
    }

    static provideClient(options: ClientOptions) {
        return {
            provide: Battlefield,
            useFactory: () => new Battlefield(ClientProxyFactory.create(options))
        }
    }
}
