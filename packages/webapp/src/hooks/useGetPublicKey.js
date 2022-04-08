import {PublicKey} from "@solana/web3.js";
import {getToken, parseToken} from "../utils/token";

export function useGetPublicKey() {
    const {accountId} = parseToken(getToken()) || {};
    
    return new PublicKey(accountId)
}
