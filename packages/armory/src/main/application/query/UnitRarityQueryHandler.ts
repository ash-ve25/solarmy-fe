import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {UnitQuery, UnitRarityQuery} from '@solar/service-provider';
import {UnitRarityDAO} from "../../dao/UnitRarityDAO";

@QueryHandler(UnitRarityQuery)
export class UnitRarityQueryHandler implements IQueryHandler {

    constructor(
        private dao: UnitRarityDAO
    ) {
    }

    execute(context: UnitQuery) {
        const {unitId} = context;

        return this.dao.findOneByIdOrFail(unitId);
    }
}
