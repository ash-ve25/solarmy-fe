import {ClientProxyFactory} from "@nestjs/microservices";
import {ClientProxy} from "@nestjs/microservices/client/client-proxy";
import {ClientOptions} from "@nestjs/microservices/interfaces/client-metadata.interface";
import {CollectRarityCommand, CollectUnitsCommand, CreateUnitCommand} from "./command";
import {AccountUnitQuery, AccountUnitsQuery, UnitQuery, UnitRarityQuery} from "./query";

export class Armory {

    constructor(
        private client: ClientProxy
    ) {
    }

    createUnit(context: CreateUnitCommand) {
        return this.client.send(CreateUnitCommand.CommandName, context);
    }

    collectUnits(context: CollectUnitsCommand) {
        return this.client.send(CollectUnitsCommand.CommandName, context);
    }

    collectRarity() {
        return this.client.send(CollectRarityCommand.CommandName, {});
    }

    findUnit(context: UnitQuery) {
        return this.client.send(UnitQuery.QueryName, context);
    }

    findUnitRarity(context: UnitRarityQuery) {
        return this.client.send(UnitRarityQuery.QueryName, context);
    }

    findAccountUnit(context: AccountUnitQuery) {
        return this.client.send(AccountUnitQuery.QueryName, context);
    }

    findAccountUnits(context: AccountUnitsQuery) {
        return this.client.send(AccountUnitsQuery.QueryName, context);
    }

    static provideClient(options: ClientOptions) {
        return {
            provide: Armory,
            useFactory: () => new Armory(ClientProxyFactory.create(options))
        }
    }
}
