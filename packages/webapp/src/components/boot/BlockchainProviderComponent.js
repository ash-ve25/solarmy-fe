import React from "react";
import {BlockchainContext} from './context/BlockchainContext';
import {Config} from "../../Config";
import {useCreateBlockchainClient} from "../../hooks/useCreateBlockchainClient";

export function BlockchainProviderComponent(props) {
    const {children} = props;
    
    const client = useCreateBlockchainClient(Config.blockchain.cluster);
    
    const value = {
        client
    };
    
    return <BlockchainContext.Provider value={value}>
        {children}
    </BlockchainContext.Provider>
}
