import {IsNotEmpty, IsString} from 'class-validator';

export class ClaimUnitCommand {

    static CommandName = 'command.claimUnit';

    @IsString()
    readonly accountId: string;

    @IsString()
    @IsNotEmpty()
    readonly unitId: string;

    constructor(accountId: string, unitId: string) {
        this.accountId = accountId;
        this.unitId = unitId;
    }

    static build(context: ClaimUnitCommand) {
        const {
            accountId,
            unitId
        } = context;

        return new ClaimUnitCommand(accountId, unitId);
    }
}
