import {IsNotEmpty, IsString} from "class-validator";

export class CollectUnitsInput {

    @IsString()
    @IsNotEmpty()
    accountId: string;
}
