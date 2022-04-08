import {Controller} from "@nestjs/common";
import {MessagePattern} from "@nestjs/microservices";
import {
    ClaimUnitCommand,
    DelistUnitCommand,
    DeployUnitCommand,
    EnqueueUnitChecksCommand,
    ReleaseUnitsCommand
} from "@solar/service-provider";
import {CommandBus} from "@nestjs/cqrs";

@Controller()
export class CommandController {

    constructor(
        private readonly commandBus: CommandBus
    ) {
    }

    @MessagePattern(DeployUnitCommand.CommandName)
    deployUnit(context: DeployUnitCommand) {
        return this.commandBus.execute(DeployUnitCommand.build(context));
    }

    @MessagePattern(DelistUnitCommand.CommandName)
    delistUnit(context: DelistUnitCommand) {
        return this.commandBus.execute(DelistUnitCommand.build(context));
    }

    @MessagePattern(EnqueueUnitChecksCommand.CommandName)
    enqueueUnitChecks() {
        return this.commandBus.execute(EnqueueUnitChecksCommand.build());
    }

    @MessagePattern(ReleaseUnitsCommand.CommandName)
    releaseUnits() {
        return this.commandBus.execute(ReleaseUnitsCommand.build());
    }

    @MessagePattern(ClaimUnitCommand.CommandName)
    claimUnit(context: ClaimUnitCommand) {
        return this.commandBus.execute(ClaimUnitCommand.build(context));
    }
}
