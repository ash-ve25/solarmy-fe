import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {Inject} from "@nestjs/common";
import {AccountPool} from "@solar/service-provider";
import {ChangeAccountUsernameInput} from "../dto/ChangeAccountUsernameInput";
import {CurrentAccountId} from "../decorator/CurrentAccountId";

@Resolver()
export class AccountResolver {

    @Inject()
    private accountPool: AccountPool

    @Query()
    accountProfile(@CurrentAccountId() id) {
       return this.accountPool.findAccount({id});
    }

    @Mutation()
    changeUsername(
        @Args('input') context: ChangeAccountUsernameInput,
        @CurrentAccountId() accountId
    ) {
        const {username} = context;

        return this.accountPool.changeAccountUsername({accountId, username})
    }
}
