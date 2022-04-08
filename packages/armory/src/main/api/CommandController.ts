import {Controller} from "@nestjs/common";
import {MessagePattern} from "@nestjs/microservices";
import {CollectRarityCommand, CollectUnitsCommand, CreateUnitCommand} from "@solar/service-provider";
import {CommandBus} from "@nestjs/cqrs";

@Controller()
export class CommandController {

    constructor(
        private readonly commandBus: CommandBus
    ) {
    }

    @MessagePattern(CreateUnitCommand.CommandName)
    createUnitCommand(context: CreateUnitCommand) {
        return this.commandBus.execute(CreateUnitCommand.build(context));
    }

    @MessagePattern(CollectUnitsCommand.CommandName)
    collectUnits(context: CollectUnitsCommand) {
        return this.commandBus.execute(CollectUnitsCommand.build(context));
    }

    @MessagePattern(CollectRarityCommand.CommandName)
    collectRarity() {
        return this.commandBus.execute(CollectRarityCommand.build());
    }
}
