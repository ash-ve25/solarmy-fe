import {IsNotEmpty, IsString} from 'class-validator';

export class CollectUnitsCommand {

    static CommandName = 'command.collectUnits';

    @IsString()
    @IsNotEmpty()
    readonly accountId: string;

    constructor(accountId: string) {
        this.accountId = accountId
    }

    static build(context: CollectUnitsCommand) {
        const {
            accountId
        } = context;

        return new CollectUnitsCommand(accountId);
    }
}
