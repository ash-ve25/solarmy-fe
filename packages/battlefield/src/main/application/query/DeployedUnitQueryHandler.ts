import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {DeployedUnitQuery, UnitQuery} from '@solar/service-provider';
import {UnitDAO} from "../../dao/UnitDAO";

@QueryHandler(DeployedUnitQuery)
export class DeployedUnitQueryHandler implements IQueryHandler {

    constructor(
        private dao: UnitDAO
    ) {
    }

    execute(context: UnitQuery) {
        const {unitId} = context;

        return this.dao.findOneByIdOrFail(unitId);
    }
}
