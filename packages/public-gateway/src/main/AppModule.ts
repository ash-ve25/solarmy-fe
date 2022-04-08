import {Global, Module} from "@nestjs/common";
import {Config} from "./Config";
import {AccountPool, Armory, AuthServer, Battlefield, Blockchain, ValidationPipe} from "@solar/service-provider";
import {PassportModule} from "@nestjs/passport";
import {GraphQLModule} from "@nestjs/graphql";
import {AuthResolver} from "./graphql/resolver/AuthResolver";
import {BlockchainResolver} from "./graphql/resolver/BlockchainResolver";
import {GqlConfigFactory} from "./graphql/GqlConfigFactory";
import {UnitResolver} from "./graphql/resolver/UnitResolver";
import {ErrorFilter} from "./graphql/filter/ErrorFilter";
import {AccountResolver} from "./graphql/resolver/AccountResolver";
import {JwtPassport} from "./graphql/auth/JwtPassport";
import {JwtGuard} from "./graphql/auth/JwtGuard";
import {BattlefieldResolver} from "./graphql/resolver/BattlefieldResolver";

@Global()
@Module({
    imports: [
        PassportModule,

        GraphQLModule.forRootAsync({
            useClass: GqlConfigFactory
        })
    ],

    providers: [
        AuthResolver,
        BlockchainResolver,
        UnitResolver,
        AccountResolver,
        BattlefieldResolver,

        JwtPassport,

        JwtGuard.provideGuard(),

        AuthServer.provideClient(Config.service.authServer),
        Blockchain.provideClient(Config.service.blockchain),
        Armory.provideClient(Config.service.armory),
        AccountPool.provideClient(Config.service.accountPool),
        Battlefield.provideClient(Config.service.battlefield),

        ValidationPipe.providePipe(),
        ErrorFilter.provideFilter()
    ],

    controllers: [
    ]
})
export class AppModule {
}
