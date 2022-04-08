import {Controller} from "@nestjs/common";
import {MessagePattern} from "@nestjs/microservices";
import {QueryBus} from '@nestjs/cqrs';
import {AccountQuery, AccountsQuery} from '@solar/service-provider';

@Controller()
export class AccountQueryController {

    constructor(
        private queryBus: QueryBus
    ) {
    }

    @MessagePattern(AccountQuery.QueryName)
    accountQuery(context: AccountQuery) {
        return this.queryBus.execute(AccountQuery.build(context));
    }

    @MessagePattern(AccountsQuery.QueryName)
    accountsQuery() {
        return this.queryBus.execute(AccountsQuery.build());
    }
}
