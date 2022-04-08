import React, {useState} from "react";
import {UnitListItem} from "./UnitListItem";
import {Tabs} from "antd";

const {TabPane} = Tabs;

export function UnitList(props) {
    const {
        units = [],
        selectedUnitId,
        pickUnit = () => {}
    } = props;
    
    const [filteredUnits, setFilteredUnits] = useState(units);
    
    return <div className="battalion-unit-list">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="ALL" key="1">
                        {filteredUnits.map((unit, key) => <UnitListItem unit={unit}
                                                                    selected={unit.id === selectedUnitId}
                                                                    onClickUnit={pickUnit}
                                                                    key={key} />).slice(0, 5)}
                    </TabPane>
                    <TabPane tab="MINT" key="2">
                        {filteredUnits.filter(({isFusion}) => !isFusion).map((unit, key) => <UnitListItem unit={unit}
                                                                    selected={unit.id === selectedUnitId}
                                                                    onClickUnit={pickUnit}
                                                                    key={key} />).slice(0, 5)}
                    </TabPane>
                    <TabPane tab="FUSION" key="3">
                        {filteredUnits.filter(({isFusion}) => isFusion).map((unit, key) => <UnitListItem unit={unit}
                                                                    selected={unit.id === selectedUnitId}
                                                                    onClickUnit={pickUnit}
                                                                    key={key} />).slice(0, 5)}
                    </TabPane>
                </Tabs>

            </div>
}
