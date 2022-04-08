import {useContext} from 'react';
import {AmmoContext} from '../../components/boot/context/AmmoContext';

export function useAmmo() {
    return useContext(AmmoContext);
}
