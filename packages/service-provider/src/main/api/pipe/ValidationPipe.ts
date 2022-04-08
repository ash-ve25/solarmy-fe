import {BadRequestException, ValidationPipe as NestValidationPipe} from "@nestjs/common";
import {APP_PIPE} from "@nestjs/core";

export class ValidationPipe extends NestValidationPipe {
    static providePipe() {
        return {
            provide: APP_PIPE,
            useFactory: () => new ValidationPipe({
                transform: true,
                forbidUnknownValues: true,
                validationError: {target: false}
            })
        }
    }
}
