import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {AccountUnitsQuery} from '@solar/service-provider';
import {UnitDAO} from "../../dao/UnitDAO";

@QueryHandler(AccountUnitsQuery)
export class AccountUnitsQueryHandler implements IQueryHandler {

    constructor(
        private dao: UnitDAO
    ) {
    }

    execute(context: AccountUnitsQuery) {
        const {accountId} = context;

        return this.dao.findByAccountId(accountId);
    }
}
