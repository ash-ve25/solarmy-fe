import {IsNotEmpty, IsString} from "class-validator";

export class SignInInput {

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    signature: string;
}
