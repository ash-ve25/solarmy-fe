import {IsNotEmpty, IsString} from 'class-validator';

export class CreateTransactionCommand {

    static CommandName = 'command.createTransaction';

    @IsString()
    @IsNotEmpty()
    readonly from: string;

    @IsString()
    @IsNotEmpty()
    readonly to: string;

    constructor(from: string, to: string) {
        this.from = from;
        this.to = to;
    }

    static build(context: CreateTransactionCommand) {
        const {
            from,
            to
        } = context;

        return new CreateTransactionCommand(from, to);
    }
}
