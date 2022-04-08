import {IsEnum, IsNotEmpty, IsString} from 'class-validator';
import {DeployTime} from "../../domain";

export class DeployUnitCommand {

    static CommandName = 'command.deployUnit';

    @IsString()
    readonly accountId: string;

    @IsString()
    @IsNotEmpty()
    readonly unitId: string;

    @IsEnum(DeployTime)
    readonly time: DeployTime;

    constructor(accountId: string, unitId: string, time: DeployTime) {
        this.accountId = accountId;
        this.unitId = unitId;
        this.time = time;
    }

    static build(context: DeployUnitCommand) {
        const {
            accountId,
            unitId,
            time
        } = context;

        return new DeployUnitCommand(accountId, unitId, time);
    }
}
