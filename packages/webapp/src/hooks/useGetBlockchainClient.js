import {useContext} from "react";
import {BlockchainContext} from '../components/boot/context/BlockchainContext';

export function useGetBlockchainClient(cluster) {
    const {client} = useContext(BlockchainContext);
    
    return client;
}
