import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {AccountUnitQuery} from '@solar/service-provider';
import {UnitDAO} from "../../dao/UnitDAO";

@QueryHandler(AccountUnitQuery)
export class AccountUnitQueryHandler implements IQueryHandler {

    constructor(
        private dao: UnitDAO
    ) {
    }

    execute(context: AccountUnitQuery) {
        return this.dao.findOneByAccountIdAndIdOrFail(context);
    }
}
