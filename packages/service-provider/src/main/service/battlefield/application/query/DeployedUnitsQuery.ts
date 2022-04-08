import {IsNotEmpty, IsString} from "class-validator";
import {IQuery} from "@nestjs/cqrs";

export class DeployedUnitsQuery implements IQuery {

    static QueryName = 'query.deployedUnits';

    @IsString()
    @IsNotEmpty()
    public readonly accountId: string;

    constructor(accountId: string) {
        this.accountId = accountId;
    }

    static build(context: DeployedUnitsQuery) {
        const {accountId} = context;

        return new DeployedUnitsQuery(accountId);
    }
}
