import React from "react";
import {UnitPreview} from "./UnitPreview";
import {Tabs} from "antd";
import {useGetUnitsAsList} from "../../hooks/unit/useGetUnitsAsList";
import { Loader } from "../ui/Loader";

const {TabPane} = Tabs;

export function Battalion(props) {
    const {units, loading, error} = useGetUnitsAsList();
    
    const all = units;
    const mint = units.filter(({isFusion}) => !isFusion);
    const fusion = units.filter(({isFusion}) => isFusion);
    
    return (
        <div className="dashboard-battalion">
            {loading && <Loader/>}
            
            {!loading && (<>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="ALL" key="1">
                        {all.map((unit, key) => <UnitPreview key={key}
                                                             unit={unit}/>)}
                    </TabPane>
                    <TabPane tab="MINT" key="2">
                        {mint.map((unit, key) => <UnitPreview key={key}
                                                              unit={unit}/>)}
                    </TabPane>
                    <TabPane tab="FUSION" key="3">
                        {fusion.map((unit, key) => <UnitPreview key={key}
                                                                unit={unit}/>)}
                    </TabPane>
                </Tabs>
            
            </>)}
        </div>
    )
}
