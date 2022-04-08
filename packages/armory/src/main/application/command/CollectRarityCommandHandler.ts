import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CollectRarityCommand} from "@solar/service-provider";
import {Armory} from "../../domain/Armory";

@CommandHandler(CollectRarityCommand)
export class CollectRarityCommandHandler implements ICommandHandler {

    constructor(
        private service: Armory
    ) {
    }

    execute() {
        return this.service.collectRarity();
    }
}
