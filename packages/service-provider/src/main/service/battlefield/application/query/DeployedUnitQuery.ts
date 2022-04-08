import {IsNotEmpty, IsString} from "class-validator";
import {IQuery} from "@nestjs/cqrs";

export class DeployedUnitQuery implements IQuery {

    static QueryName = 'query.deployedUnit';

    @IsString()
    @IsNotEmpty()
    public readonly unitId: string;

    constructor(unitId: string) {
        this.unitId = unitId;
    }

    static build(context: DeployedUnitQuery) {
        const {unitId} = context;

        return new DeployedUnitQuery(unitId);
    }
}
