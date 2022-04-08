import React, {useEffect} from "react";
import {AmmoContext} from './context/AmmoContext';
import {useFetchAmmoAccountLazy} from "../../hooks/ammo/useFetchAmmoAccountLazy";

export function AmmoProviderComponent(props) {
    const {children} = props;
    
    const [loadAmmo, payload] = useFetchAmmoAccountLazy();
    
    useEffect(() => {
        loadAmmo();
    }, []);
    
    const value = {
        ...payload,
        refetch: () => loadAmmo()
    };
    
    return <AmmoContext.Provider value={value}>
        {children}
    </AmmoContext.Provider>
}
