import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {ReleaseUnitsCommand} from "@solar/service-provider";
import {Battlefield} from "../../domain/Battlefield";

@CommandHandler(ReleaseUnitsCommand)
export class ReleaseUnitsCommandHandler implements ICommandHandler {

    constructor(
        private service: Battlefield
    ) {
    }

    execute() {
        return this.service.releaseUnits();
    }
}
