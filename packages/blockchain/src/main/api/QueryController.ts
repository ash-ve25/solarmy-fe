import {Controller} from "@nestjs/common";
import {QueryBus} from "@nestjs/cqrs";
import {MessagePattern} from "@nestjs/microservices";
import {AccountNFTsQuery} from "@solar/service-provider";

@Controller()
export class QueryController {

    constructor(
        private queryBus: QueryBus
    ) {
    }

    @MessagePattern(AccountNFTsQuery.QueryName)
    accountNFTs(context: AccountNFTsQuery) {
        return this.queryBus.execute(AccountNFTsQuery.build(context));
    }
}
