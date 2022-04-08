import {IsNotEmpty, IsString} from 'class-validator';

export class AccountNFTsQuery {

    static QueryName = 'query.accountNFTs';

    @IsString()
    @IsNotEmpty()
    readonly publicAddress: string;

    constructor(publicAddress: string) {
        this.publicAddress = publicAddress
    }

    static build(context: AccountNFTsQuery) {
        const {
            publicAddress
        } = context;

        return new AccountNFTsQuery(publicAddress);
    }
}
