import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {Inject} from "@nestjs/common";
import {Battlefield} from "@solar/service-provider";
import {CurrentAccountId} from "../decorator/CurrentAccountId";
import {DeployUnitInput} from "../dto/DeployUnitInput";

@Resolver()
export class BattlefieldResolver {

    @Inject()
    private battlefield: Battlefield

    @Mutation()
    deployUnit(
        @Args('input') input: DeployUnitInput,
        @CurrentAccountId() accountId
    ) {
        return this.battlefield.deployUnit({
            accountId,
            ...input
        })
    }
    @Mutation()
    claimDeployedUnit(
        @Args('unitId') unitId,
        @CurrentAccountId() accountId
    ) {
        return this.battlefield.claimUnit({
            accountId,
            unitId
        })
    }

    @Mutation()
    delistUnit(
        @Args('unitId') unitId,
        @CurrentAccountId() accountId
    ) {
        return this.battlefield.delistUnit({
            accountId,
            unitId
        })
    }

    @Query()
    deployedUnits(@CurrentAccountId() accountId) {
        return this.battlefield.findUnits({
            accountId
        });
    }
}
