import {IsUUID} from "class-validator";
import {IQuery} from "@nestjs/cqrs";

export class UnitQuery implements IQuery {

    static QueryName = 'query.unit';

    @IsUUID(4)
    public readonly unitId: string;

    constructor(unitId: string) {
        this.unitId = unitId;
    }

    static build(context: UnitQuery) {
        const {unitId} = context;

        return new UnitQuery(unitId);
    }
}
