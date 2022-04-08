import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {AccountQuery} from '@solar/service-provider';
import {AccountDAO} from "../../dao/AccountDAO";

@QueryHandler(AccountQuery)
export class AccountQueryHandler implements IQueryHandler {

    constructor(
        private dao: AccountDAO
    ) {
    }

    execute(context: AccountQuery) {
        const {id} = context;

        return this.dao.findOneByIdOrFail(id);
    }
}
