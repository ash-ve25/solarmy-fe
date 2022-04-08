import React from "react";
import {useGetUnit} from "../../hooks/unit/useGetUnit";
import {UnitImage} from "../ui/UnitImage";
import {useFetchUnitData} from "../../hooks/unit/useFetchUnitData";
import {useUnitRarityQuery} from "../../hooks/unit/useUnitRarityQuery";
import {Col, Row} from 'antd';
import {parseSoldierNumber} from "../../utils/parseSoldierNumber";
import { Loader } from "../ui/Loader";

export function SelectedUnit(props) {
    const {
        unitId
    } = props;
    
    const unit = useGetUnit(unitId) || {};
    const hasUnit = !!unit;
    const {
        points = 0,
        isFusion,
    } = unit;
    
    const {data: unitData = {}, loading} = useFetchUnitData({uri: unit?.uri, skip: !hasUnit});
    const {data: rarity = {}, loading: isRarityLoading} = useUnitRarityQuery({id: unitId});

    const {
        image: imageUri,
        name
    } = unitData;
    const {
        id,
        is2d,
        data: {
            id: howrareId,
            rank
        } = {}
    }  = rarity;
    
    const number = parseSoldierNumber(name);
    const howrareUri = `https://magiceden.io/item-details/${id}`
   
    return <div className="battalion-unit">
        {!hasUnit && (<p>
            There is not such unit
        </p>)}

        {hasUnit && (<>
            {loading && <Loader/>}

            {!loading && (
                <>
                    <Row gutter={24}>
                        <Col span={14}>
                            <UnitImage uri={imageUri} />
                        </Col>
                        <Col span={10} className="unit-data">
                            <div className="unit-data-item">
                                <p className="unit-id">#{number}
                                    <span>Mint: {!isFusion}</span>
                                </p>
                                <p>Points <span>{points}</span></p>
                                <p>Rank <span>{rank}</span></p>
                            </div>
                            <div className="unit-data-item">
                                <div className="attribute-score">ATTRIBUTE SCORE</div>
                                <a className="unit-item-link"
                                   target="_blank"
                                   href={howrareUri}>
                                    {howrareUri}
                                </a>
                            </div>
                        </Col>
                    </Row>
                </>
            )}
        </>)}
    </div>
}
