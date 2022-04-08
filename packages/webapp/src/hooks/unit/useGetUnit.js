import {useGetUnits} from "./useGetUnits";

export function useGetUnit(id) {
    const {units} = useGetUnits();

    return units.get(id);
}
