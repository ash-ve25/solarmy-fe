import React, {useMemo} from "react";
import {UnitListItem} from "./UnitListItem";
import {Card, Col, Row} from 'antd';

export function UnitList(props) {
    const {
        units = [],
        deployedUnits = [],
        view = 'normal',
        onDeployUnit,
        onDelistUnit,
        onClaimUnit
    } = props;
    
    const map = useMemo(() => new Map(deployedUnits.map(unit => [unit.id, unit])), [deployedUnits]);
    const htmlClass = `deploy-unit-list deploy-unit-list-${view}`;
    
    return <div className={htmlClass}>
        <Row gutter={24}>
            {units.map((unit, key) => <Col span={12}
                                                   key={key}>
                <Card bordered={false}
                      className="deploy-unit-list-card-item">
                    <UnitListItem unit={unit}
                                  deployedUnit={map.get(unit.id)}
                                  onDeployUnit={onDeployUnit}
                                  onClaimUnit={onClaimUnit}
                                  onDelistUnit={onDelistUnit}/>
                </Card>
            </Col>)}
        </Row>
    </div>
}
