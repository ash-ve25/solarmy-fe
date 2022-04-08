import {Controller} from "@nestjs/common";
import {MessagePattern} from "@nestjs/microservices";
import {AccountUnitQuery, AccountUnitsQuery, UnitQuery, UnitRarityQuery} from "@solar/service-provider";
import {QueryBus} from "@nestjs/cqrs";

@Controller()
export class QueryController {

    constructor(
        private readonly queryBus: QueryBus
    ) {
    }

    @MessagePattern(UnitQuery.QueryName)
    unitQuery(context: UnitQuery) {
        return this.queryBus.execute(UnitQuery.build(context));
    }

    @MessagePattern(AccountUnitQuery.QueryName)
    accountUnitQuery(context: AccountUnitQuery) {
        return this.queryBus.execute(AccountUnitQuery.build(context));
    }

    @MessagePattern(AccountUnitsQuery.QueryName)
    accountUnitsQuery(context: AccountUnitsQuery) {
        return this.queryBus.execute(AccountUnitsQuery.build(context));
    }

    @MessagePattern(UnitRarityQuery.QueryName)
    unitRarityQuery(context: UnitRarityQuery) {
        return this.queryBus.execute(UnitRarityQuery.build(context));
    }
}
