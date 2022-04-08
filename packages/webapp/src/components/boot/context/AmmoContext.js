import {createContext} from 'react';

const value = {
    data: {
        tokenAmount: {
            amount: '0',
            uiAmount: 0,
            uiAmountString: '0',
            decimals: 0
        }
    },
    loading: false,
    refetch: () => {}
};

const AmmoContext = createContext(value);

export {
    AmmoContext
}
