import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateUnitCommand} from "@solar/service-provider";
import {Armory} from "../../domain/Armory";

@CommandHandler(CreateUnitCommand)
export class CreateUnitCommandHandler implements ICommandHandler {

    constructor(
        private service: Armory
    ) {
    }

    execute(context: CreateUnitCommand) {
        return this.service.createUnit(context);
    }
}
