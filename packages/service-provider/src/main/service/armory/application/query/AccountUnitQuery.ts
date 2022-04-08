import {IsNotEmpty, IsString, IsUUID} from "class-validator";
import {IQuery} from "@nestjs/cqrs";

export class AccountUnitQuery implements IQuery {

    static QueryName = 'query.accountUnit';

    @IsUUID(4)
    public readonly unitId: string;

    @IsString()
    @IsNotEmpty()
    public readonly accountId: string;

    constructor(unitId: string, accountId: string) {
        this.unitId = unitId;
        this.accountId = accountId;
    }

    static build(context: AccountUnitQuery) {
        const {unitId, accountId} = context;

        return new AccountUnitQuery(unitId, accountId);
    }
}
