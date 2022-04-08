import {IsNotEmpty, IsString} from 'class-validator';

export class DelistUnitCommand {

    static CommandName = 'command.delistUnit';

    @IsString()
    readonly accountId: string;

    @IsString()
    @IsNotEmpty()
    readonly unitId: string;

    constructor(accountId: string, unitId: string) {
        this.accountId = accountId;
        this.unitId = unitId;
    }

    static build(context: DelistUnitCommand) {
        const {
            accountId,
            unitId
        } = context;

        return new DelistUnitCommand(accountId, unitId);
    }
}
