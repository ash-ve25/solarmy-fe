import {Args, Mutation, Resolver} from "@nestjs/graphql";
import {BadRequestException, Inject} from "@nestjs/common";
import {AuthServer} from "@solar/service-provider";
import {GenerateSignInCodeInput} from "../dto/GenerateSignInCodeInput";
import {SignInInput} from "../dto/SignInInput";
import {PublicRoute} from "../decorator/PublicRoute";

@Resolver()
export class AuthResolver {

    @Inject()
    private service: AuthServer

    @PublicRoute()
    @Mutation()
    async signIn(@Args('input') context: SignInInput) {
        try {
            return await this.service.signIn(context);
        } catch (e) {
            throw new BadRequestException();
        }
    }

    @PublicRoute()
    @Mutation()
    generateSignInCode(@Args('input') context: GenerateSignInCodeInput) {
        return this.service.generateSignInCode(context);
    }
}
