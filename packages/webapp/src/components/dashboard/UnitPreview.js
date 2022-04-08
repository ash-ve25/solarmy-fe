import React from "react";
import {useFetchUnitData} from "../../hooks/unit/useFetchUnitData";
import {UnitImage} from "../ui/UnitImage";
import {parseSoldierNumber} from "../../utils/parseSoldierNumber";
import {useUnitRarityQuery} from "../../hooks/unit/useUnitRarityQuery";
import {Loader} from "../ui/Loader";

export function UnitPreview(props) {
    const {
        unit: {
            uri,
            id,
            isFusion
        } = {}
    } = props;
    
    const {data: {image: imageUri, name} = {}, loading} = useFetchUnitData({uri});
    const {data: rarity = {}, loading: isRarityLoading} = useUnitRarityQuery({id});
    const {
        data: {
            rank
        } = {}
    }  = rarity
    
    const number = parseSoldierNumber(name);
    
    return (
        <div className="dashboard-unit-preview">
            {loading && <Loader />}
            
            {!loading && (<>
                <div className="dashboard-unit-preview-content">
                    {isRarityLoading && <Loader />}
                    
                    {!isRarityLoading && <div>
                        <p>#{number}</p>

                        {/*Fusion: {isFusion}*/}
                        <p>Points: {rank}</p>
                        {/*Rarity: 1*/}
                    </div>}
                </div>
                
                <UnitImage uri={imageUri} />
            </>)}
        </div>
    )
}
