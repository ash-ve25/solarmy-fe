import {useContext} from "react";
import {UnitContext} from "../../components/boot/context/UnitContext";

export function useGetUnits() {
    return useContext(UnitContext);
}
