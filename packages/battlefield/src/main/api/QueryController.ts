import {Controller} from "@nestjs/common";
import {MessagePattern} from "@nestjs/microservices";
import {DeployedUnitQuery, DeployedUnitsQuery} from "@solar/service-provider";
import {QueryBus} from "@nestjs/cqrs";

@Controller()
export class QueryController {

    constructor(
        private readonly queryBus: QueryBus
    ) {}

    @MessagePattern(DeployedUnitQuery.QueryName)
    deployedUnit(context: DeployedUnitQuery) {
        return this.queryBus.execute(DeployedUnitQuery.build(context));
    }

    @MessagePattern(DeployedUnitsQuery.QueryName)
    deployedUnits(context: DeployedUnitsQuery) {
        return this.queryBus.execute(DeployedUnitsQuery.build(context));
    }
}
