import {IsNotEmpty, IsString} from "class-validator";
import {IQuery} from "@nestjs/cqrs";

export class AccountQuery implements IQuery {

    static QueryName = 'query.account';

    @IsString()
    @IsNotEmpty()
    public readonly id: string

    constructor(id: string) {
        this.id = id;
    }

    static build(context: AccountQuery) {
        const {id} = context;

        return new AccountQuery(id);
    }
}
