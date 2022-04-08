import {IsNotEmpty, IsString} from "class-validator";

export class CreateTransactionInput {

    @IsString()
    @IsNotEmpty()
    from: string;

    @IsString()
    @IsNotEmpty()
    to: string;
}
