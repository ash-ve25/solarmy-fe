import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {AccountNFTsQuery} from "@solar/service-provider";
import {SolanaAdapter} from "../../infrastructure/SolanaAdapter";
import {filter, lastValueFrom, map, mergeAll, tap, toArray} from "rxjs";

@QueryHandler(AccountNFTsQuery)
export class AccountNFTsQueryHandler implements IQueryHandler {

    constructor(
        private adapter: SolanaAdapter
    ) {
    }

    execute(context: AccountNFTsQuery) {
        const {publicAddress} = context;

        return lastValueFrom(this.adapter.fetchNftByOwner(publicAddress).pipe(
            mergeAll(),
            this.filter(),
            map(({data: {creators, ...others}, mint: address}: any) => ({
                ...others,
                address
            })),
            toArray()
        ));
    }

    private filter() {
        const regExp = new RegExp(/(2D|3D|2d|3d)/);
        const symbols = ['SLDR3D', 'SLDR2D'];

        return filter(({data: {name, symbol}}) => symbols.includes(symbol) || regExp.test(name));
    }
}
