import {IsNotEmpty, IsString} from "class-validator";
import {IQuery} from "@nestjs/cqrs";

export class UnitRarityQuery implements IQuery {

    static QueryName = 'query.unitRarity';

    @IsString()
    @IsNotEmpty()
    public readonly unitId: string;

    constructor(unitId: string) {
        this.unitId = unitId;
    }

    static build(context: UnitRarityQuery) {
        const {unitId} = context;

        return new UnitRarityQuery(unitId);
    }
}
