import {useEffect} from "react";
import {useFetchUnitDataLazy} from "./useFetchUnitDataLazy";

export function useFetchUnitData({uri, skip = false}) {
    const [fetchData, payload] = useFetchUnitDataLazy();
    
    useEffect(() => {
        !skip && fetchData(uri)
    }, [uri]);
    
    return payload;
}
