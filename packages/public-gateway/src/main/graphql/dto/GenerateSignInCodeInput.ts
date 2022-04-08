import {IsNotEmpty, IsString} from "class-validator";

export class GenerateSignInCodeInput {

    @IsString()
    @IsNotEmpty()
    username: string;
}
