import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {Inject} from "@nestjs/common";
import {Armory} from "@solar/service-provider";
import {CreateUnitInput} from "../dto/CreateUnitInput";
import {CurrentAccountId} from "../decorator/CurrentAccountId";
import {PublicRoute} from "../decorator/PublicRoute";

@Resolver()
export class UnitResolver {

    @Inject()
    private armory: Armory

    @Mutation()
    createUnit(
        @Args('input') context: CreateUnitInput,
        @CurrentAccountId() accountId
    ) {
        // return this.armory.createUnit({accountId});
        return {};
    }

    @Mutation()
    collectUnits(@CurrentAccountId() accountId) {
        // return this.armory.collectUnits({accountId});
        return {};
    }

    @Query()
    battalion(@CurrentAccountId() accountId) {
       return this.armory.findAccountUnits({accountId});
    }

    @Query()
    unit(@Args('id') unitId: string) {
        return this.armory.findUnit({unitId});
    }

    @Query()
    @PublicRoute()
    unitRarity(@Args('id') unitId: string) {
        return this.armory.findUnitRarity({unitId});
    }

    //TODO delete for prod release
    @Mutation()
    @PublicRoute()
    collectRarity() {
        // return this.armory.collectRarity();
        return {};
    }

}
