import {
    clusterApiUrl,
    Connection,
    Keypair,
    PublicKey,
    sendAndConfirmTransaction,
    Transaction,
    TransactionSignature,cl
} from '@solana/web3.js';
import {getParsedNftAccountsByOwner} from "@nfteyez/sol-rayz";
import {from} from "rxjs";
import {Token, TOKEN_PROGRAM_ID} from '@solana/spl-token'
import {decode} from 'bs58';

export class SolanaAdapter {

    private readonly connection: Connection;
    private readonly ammoWalletKeypair: Keypair;
    private readonly ammoMintAddress: PublicKey;

    constructor(config) {
        const {cluster, ammoMintPrivateKey, ammoTokenAddress} = config;

        this.connection = new Connection(cluster, 'confirmed');
        this.ammoWalletKeypair = Keypair.fromSecretKey(decode(ammoMintPrivateKey));
        this.ammoMintAddress = new PublicKey(ammoTokenAddress);
    }

    fetchNftByOwner(publicAddress) {
        return from(getParsedNftAccountsByOwner({
            publicAddress,
            connection: this.connection
        }));
    }

    async sendAmmo(context) {
        const {walletAddress, amount} = context;

        const mint = new Token(
            this.connection,
            this.ammoMintAddress,
            TOKEN_PROGRAM_ID,
            this.ammoWalletKeypair
        );

        const toWalletPublicKey = new PublicKey(walletAddress);
        const ammoAmount = amount*1000000000;

        const toAmmoWallet = await mint.getOrCreateAssociatedAccountInfo(toWalletPublicKey);
        const fromAmmoWallet = await mint.getOrCreateAssociatedAccountInfo(this.ammoWalletKeypair.publicKey);

        const trx = new Transaction().add(
            Token.createTransferInstruction(
                TOKEN_PROGRAM_ID,
                fromAmmoWallet.address,
                toAmmoWallet.address,
                this.ammoWalletKeypair.publicKey,
                [],
                ammoAmount
            ),
        );

        return sendAndConfirmTransaction(
            this.connection,
            trx,
            [this.ammoWalletKeypair],
            {commitment: 'confirmed'},
        );
    }

    confirmTransaction(transaction: TransactionSignature) {
        return this.connection.confirmTransaction(transaction);
    }

    getAccountInfo(k) {
        return this.connection.getAccountInfo(k)
    }

    static provideAdapter(options) {
        return {
            provide: SolanaAdapter,
            useFactory: () => {
                return new SolanaAdapter(options)
            }
        }
    }
}
