import React from "react";
import {useFetchUnitData} from "../../hooks/unit/useFetchUnitData";
import {UnitImage} from "../ui/UnitImage";
import {parseSoldierNumber} from "../../utils/parseSoldierNumber";
import {Loader} from "../ui/Loader";

export function UnitListItem(props) {
    const {
        unit: {
            id,
            name = '',
            uri
        } = {},
        selected,
        onClickUnit = () => {}
    } = props;
    
    const {data: {image: imageUri} = {}, loading} = useFetchUnitData({uri});
    
    const number = parseSoldierNumber(name);
    
    const onClickItem = () => onClickUnit(id);
    
    return (
        <div className="battalion-unit-preview">
            {loading && <Loader />}
            
            {!loading && (<div onClick={onClickItem}>
                {/* <span>{selected && "SELECTED"}</span> */}
                
                <UnitImage uri={imageUri} />
                
                <span>#{number}</span>
            </div>)}
        </div>
    )
}
