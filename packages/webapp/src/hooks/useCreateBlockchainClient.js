import {useState} from "react";
import {Connection} from "@solana/web3.js";

export function useCreateBlockchainClient(cluster) {
    const [client] = useState(() => new Connection(cluster, 'confirmed'));
    
    return client;
}
