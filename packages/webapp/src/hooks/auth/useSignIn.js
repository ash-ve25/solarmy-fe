import base58 from "bs58";
import {useGenerateSignInCodeMutation} from "./useGenerateSignInCodeMutation";
import {useSignInMutation} from "./useSignInMutation";
import {setToken} from "../../utils/token";

export function useSignIn() {
    const [generateCode] = useGenerateSignInCodeMutation();
    const [signIn] = useSignInMutation();
    
    return (wallet = 'phantom') => {
        const wallets = {
            phantom: async () => {
                const isPhantomInstalled = !!(window.solana && window.solana.isPhantom);
    
                if (isPhantomInstalled) {
                    try {
                        const wallet = await window.solana.connect();
                        
                        const {data: message, loading} = await generateCode({username: wallet.publicKey.toString()});
                        const {publicKey, signature} = await window.solana.signMessage(new TextEncoder().encode(message), 'utf8');
                        
                        const {data: {accessToken}} = await signIn({
                            username: base58.encode(publicKey.toBytes()),
                            signature: base58.encode(signature)
                        });
                        
                        setToken(accessToken);
                        
                        window.location.reload();
                    } catch (err) {
                        console.log(err);
                    }
                } else {
                    window.open("https://phantom.app/", "_blank");
                }
            }
        };
        
        const strategy = wallets[wallet] || (() => {});
        
        return strategy();
    }
}
