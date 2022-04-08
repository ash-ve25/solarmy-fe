// import {getParsedNftAccountsByOwner} from "@nfteyez/sol-rayz";
import {useWalletNfts} from "@nfteyez/sol-rayz-react";
import {isNftSoldier} from "../../utils/isNftSoldier";
import {is2DSoldier} from "../../utils/is2DSoldier";
import {isFusionSoldier} from "../../utils/isFusionSoldier";
import {useGetPublicKey} from "../useGetPublicKey";
import {useGetBlockchainClient} from "../useGetBlockchainClient";

export function useFetchUnits() {
    const client = useGetBlockchainClient();
    const key = useGetPublicKey();
    
    const {nfts = [], isLoading: loading, error} = useWalletNfts({
        connection: client,
        publicAddress: key.toString()
    });
    
    const units = nfts
        .filter(({data}) => isNftSoldier(data))
        .map(({data = {}, mint} = {}) => {
            const {creators, ...others} = data;
            return {
                id: mint,
                is2D: is2DSoldier(data),
                isFusion: isFusionSoldier(data),
                ...others
            }
        });
    
    return {
        data: units,
        loading,
        error
    };
}
