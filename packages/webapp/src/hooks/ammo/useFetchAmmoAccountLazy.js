import {useState} from "react";
import {useGetBlockchainClient} from "../useGetBlockchainClient";
import {useGetPublicKey} from "../useGetPublicKey";
import {useGetAmmoMintPublicKey} from "../useGetAmmoMintPublicKey";

export function useFetchAmmoAccountLazy() {
    const client = useGetBlockchainClient();
    const publicKey = useGetPublicKey();
    const mint = useGetAmmoMintPublicKey();
    
    const [data, setData] = useState({
        loading: false,
        data: undefined,
        error: undefined
    });
    
    return [
        async () => {
            setData({
                loading: true,
                data: undefined
            });
            
            const {value = []} = await client.getParsedTokenAccountsByOwner(
                publicKey,
                {
                    mint
                }
            ).catch(e => {})
            
            const state = {
                tokenAmount: {
                    amount: '0',
                    uiAmount: 0,
                    uiAmountString: '0',
                    decimals: 0
                }
            };
     
            const out = value.reduce((state, {account}) => {
                const item = account?.data?.parsed?.info || {};
     
                return {
                    tokenAmount: {
                        amount: '' + (BigInt(state.tokenAmount.amount) + BigInt(item.tokenAmount.amount)),
                        uiAmount: state.tokenAmount.uiAmount + item.tokenAmount.uiAmount,
                        uiAmountString: '' + (parseInt(state.tokenAmount.uiAmountString) + parseInt(item.tokenAmount.uiAmountString)),
                        decimals: item.tokenAmount.decimals
                    }
                }
            }, state);
      
            setData({
                loading: false,
                data: out,
                error: undefined
            });
        },
        
        data
    ];
}
