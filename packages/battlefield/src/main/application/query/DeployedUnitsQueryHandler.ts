import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {DeployedUnitsQuery} from '@solar/service-provider';
import {UnitDAO} from "../../dao/UnitDAO";

@QueryHandler(DeployedUnitsQuery)
export class DeployedUnitsQueryHandler implements IQueryHandler {

    constructor(
        private dao: UnitDAO
    ) {
    }

    execute(context: DeployedUnitsQuery) {
        const {accountId} = context;

        return this.dao.findByAccountId(accountId);
    }
}
