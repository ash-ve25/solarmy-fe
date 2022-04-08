import {createContext} from 'react';

const value = {
    connection: undefined
};

const BlockchainContext = createContext(value);

export {
    BlockchainContext
}
