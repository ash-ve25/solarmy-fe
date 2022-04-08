import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CollectUnitsCommand} from "@solar/service-provider";
import {Armory} from "../../domain/Armory";

@CommandHandler(CollectUnitsCommand)
export class CollectUnitsCommandHandler implements ICommandHandler {

    constructor(
        private service: Armory
    ) {
    }

    execute(context: CollectUnitsCommand) {
        return this.service.collectUnits(context);
    }
}
