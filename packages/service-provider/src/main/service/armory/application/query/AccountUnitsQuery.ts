import {IsNotEmpty, IsString} from "class-validator";
import {IQuery} from "@nestjs/cqrs";

export class AccountUnitsQuery implements IQuery {

    static QueryName = 'query.accountUnits';

    @IsString()
    @IsNotEmpty()
    public readonly accountId: string;

    constructor(accountId: string) {
        this.accountId = accountId;
    }

    static build(context: AccountUnitsQuery) {
        const {accountId} = context;

        return new AccountUnitsQuery(accountId);
    }
}
