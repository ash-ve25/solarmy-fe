import {IsEnum, IsNotEmpty, IsNumberString, IsString} from "class-validator";
import {DeployTime} from "@solar/service-provider";

export class DeployUnitInput {

    @IsString()
    @IsNotEmpty()
    unitId: string;

    @IsEnum(DeployTime)
    readonly time: DeployTime;
}
