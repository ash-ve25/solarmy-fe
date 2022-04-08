import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DelistUnitCommand} from "@solar/service-provider";
import {Battlefield} from "../../domain/Battlefield";

@CommandHandler(DelistUnitCommand)
export class DelistUnitCommandHandler implements ICommandHandler {

    constructor(
        private service: Battlefield
    ) {
    }

    execute(context: DelistUnitCommand) {
        return this.service.delistUnit(context);
    }
}
