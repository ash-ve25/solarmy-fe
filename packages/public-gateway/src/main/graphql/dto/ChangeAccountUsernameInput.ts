import {IsNotEmpty, IsString} from "class-validator";

export class ChangeAccountUsernameInput {

    @IsString()
    @IsNotEmpty()
    username: string;
}
