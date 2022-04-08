import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateUnitCommand, DeployUnitCommand} from "@solar/service-provider";
import {Battlefield} from "../../domain/Battlefield";

@CommandHandler(DeployUnitCommand)
export class DeployUnitCommandHandler implements ICommandHandler {

    constructor(
        private service: Battlefield
    ) {
    }

    execute(context: CreateUnitCommand) {
        return this.service.deployUnit(context);
    }
}
