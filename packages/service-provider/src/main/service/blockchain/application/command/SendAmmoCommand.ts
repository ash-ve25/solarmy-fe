import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class SendAmmoCommand {

    static CommandName = 'command.sendAmmo';

    @IsString()
    @IsNotEmpty()
    readonly walletAddress: string;

    @IsNumber()
    @IsNotEmpty()
    readonly amount: number;

    constructor(walletAddress: string, amount: number) {
        this.walletAddress = walletAddress;
        this.amount = amount;
    }

    static build(context: SendAmmoCommand) {
        const {
            walletAddress,
            amount
        } = context;

        return new SendAmmoCommand(walletAddress, amount);
    }
}
