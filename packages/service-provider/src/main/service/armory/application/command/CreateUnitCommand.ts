import {IsUUID} from 'class-validator';

export class CreateUnitCommand {

    static CommandName = 'command.createUnit';

    @IsUUID(4)
    readonly accountId: string;

    constructor(accountId: string) {
        this.accountId = accountId;
    }

    static build(context: CreateUnitCommand) {
        const {
            accountId
        } = context;

        return new CreateUnitCommand(accountId);
    }
}
