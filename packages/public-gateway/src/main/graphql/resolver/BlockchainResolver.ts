import {Args, Mutation, Resolver} from "@nestjs/graphql";
import {Inject} from "@nestjs/common";
import {Blockchain} from "@solar/service-provider";
import {CreateTransactionInput} from "../dto/CreateTransactionInput";

@Resolver()
export class BlockchainResolver {

    @Inject()
    private blockchain: Blockchain

    @Mutation()
    createTransaction(@Args('input') context: CreateTransactionInput) {
        // return this.blockchain.createTransaction(context);
        return {};
    }
}
