import {PublicKey} from "@solana/web3.js";
import {Config} from "../Config";

export function useGetAmmoMintPublicKey() {
    return new PublicKey(Config.blockchain.ammoMintAddress);
}
