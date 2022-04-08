import {IsString} from "class-validator";

export class CreateUnitInput {

    @IsString()
    readonly name: string
}
