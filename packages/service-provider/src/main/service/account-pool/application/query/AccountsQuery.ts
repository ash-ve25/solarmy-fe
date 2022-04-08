import {IQuery} from "@nestjs/cqrs";

export class AccountsQuery implements IQuery {

    static QueryName = 'query.accounts';

    static build() {
        return new AccountsQuery();
    }
}
