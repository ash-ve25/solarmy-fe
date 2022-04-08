import React, {useMemo} from "react";
import {useFetchUnits} from "../../hooks/unit/useFetchUnits";
import {UnitContext} from "./context/UnitContext";

export function UnitProviderComponent(props) {
    const {children} = props;
    
    const {data: list = [] = {}, loading, error} = useFetchUnits();
    
    const units = useMemo(() => new Map(list.map(unit => [unit.id, unit])), [list.length]);
    
    const state = {
        units,
        loading,
        error
    };
    
    return <UnitContext.Provider value={state}>
        {children}
    </UnitContext.Provider>
}
