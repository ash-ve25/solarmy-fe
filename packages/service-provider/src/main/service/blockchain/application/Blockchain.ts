import {ClientProxyFactory} from "@nestjs/microservices";
import {ClientProxy} from "@nestjs/microservices/client/client-proxy";
import {ClientOptions} from "@nestjs/microservices/interfaces/client-metadata.interface";
import {CreateTransactionCommand, SendAmmoCommand} from "./command";
import {AccountNFTsQuery} from "./query";

export class Blockchain {

    constructor(
        private client: ClientProxy
    ) {
    }

    createTransaction(context: CreateTransactionCommand) {
        return this.client.send(CreateTransactionCommand.CommandName, context);
    }

    sendAmmo(context: SendAmmoCommand) {
        return this.client.send(SendAmmoCommand.CommandName, context);
    }

    findAccountNFTs(context: AccountNFTsQuery) {
        return this.client.send(AccountNFTsQuery.QueryName, context);
    }


    static provideClient(options: ClientOptions) {
        return {
            provide: Blockchain,
            useFactory: () => new Blockchain(ClientProxyFactory.create(options))
        }
    }
}
