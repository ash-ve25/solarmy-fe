import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {UnitQuery} from '@solar/service-provider';
import {UnitDAO} from "../../dao/UnitDAO";

@QueryHandler(UnitQuery)
export class UnitQueryHandler implements IQueryHandler {

    constructor(
        private dao: UnitDAO
    ) {
    }

    execute(context: UnitQuery) {
        const {unitId} = context;

        return this.dao.findOneByIdOrFail(unitId);
    }
}
