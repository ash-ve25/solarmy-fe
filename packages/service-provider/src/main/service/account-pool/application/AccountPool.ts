import {ClientProxyFactory} from "@nestjs/microservices";
import {ClientProxy} from "@nestjs/microservices/client/client-proxy";
import {ClientOptions} from "@nestjs/microservices/interfaces/client-metadata.interface";
import {ChangeAccountUsernameCommand, CreateAccountCommand,} from "./command";
import {AccountQuery, AccountsQuery} from "./query";

export class AccountPool {

    constructor(
        private client: ClientProxy
    ) {
    }

    createAccount(context: CreateAccountCommand) {
        return this.client.send(CreateAccountCommand.CommandName, context);
    }

    changeAccountUsername(context: ChangeAccountUsernameCommand) {
        return this.client.send(ChangeAccountUsernameCommand.CommandName, context);
    }

    findAccount(context: AccountQuery) {
        return this.client.send(AccountQuery.QueryName, context);
    }

    findAccounts() {
        return this.client.send(AccountsQuery.QueryName, {});
    }

    static provideClient(options: ClientOptions) {
        return {
            provide: AccountPool,
            useFactory: () => new AccountPool(ClientProxyFactory.create(options))
        }
    }
}
