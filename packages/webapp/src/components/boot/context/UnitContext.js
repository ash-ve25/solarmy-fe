import {createContext} from 'react';

const value = {
    units: new Map()
};

const UnitContext = createContext(value);

export {
    UnitContext
}
