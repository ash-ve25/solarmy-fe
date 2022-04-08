import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {ClaimUnitCommand} from "@solar/service-provider";
import {Battlefield} from "../../domain/Battlefield";

@CommandHandler(ClaimUnitCommand)
export class ClaimUnitCommandHandler implements ICommandHandler {

    constructor(
        private service: Battlefield
    ) {
    }

    execute(context: ClaimUnitCommand) {
        return this.service.claimUnit(context);
    }
}
