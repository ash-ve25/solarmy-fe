import {useContext, useMemo} from "react";
import {UnitContext} from "../../components/boot/context/UnitContext";
import {useGetUnits} from "./useGetUnits";

export function useGetUnitsAsList() {
    const {units, ...others} = useGetUnits();
    
    const list = useMemo(() => Array.from(units.values()), [units]);
    
    return {
        units: list,
        ...others
    }
}
