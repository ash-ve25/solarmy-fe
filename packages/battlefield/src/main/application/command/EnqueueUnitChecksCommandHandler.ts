import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {EnqueueUnitChecksCommand} from "@solar/service-provider";
import {Battlefield} from "../../domain/Battlefield";

@CommandHandler(EnqueueUnitChecksCommand)
export class EnqueueUnitChecksCommandHandler implements ICommandHandler {

    constructor(
        private service: Battlefield
    ) {
    }

    execute(context: EnqueueUnitChecksCommand) {
        return this.service.enqueueUnitChecks();
    }
}
