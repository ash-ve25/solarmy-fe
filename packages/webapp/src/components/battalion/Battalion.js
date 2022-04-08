import React, {useEffect, useState} from 'react';
import {Card, Col, Layout, Row} from 'antd';
import {HeaderApp} from "../header-app/HeaderApp";
import {FooterApp} from "../footer-app/FooterApp";
import {useGetUnitsAsList} from "../../hooks/unit/useGetUnitsAsList";
import {UnitList} from "./UnitList";
import {SelectedUnit} from "./SelectedUnit";
import { Loader } from '../ui/Loader';

const {Content} = Layout;

export function Battalion() {
    const [selectedUnitId, setUnitId] = useState();
    const {units, loading, error} = useGetUnitsAsList();
    const isLoading = loading;
    
    const pickUnit = id => setUnitId(id);
    
    useEffect(() => {
        !isLoading && !selectedUnitId && setUnitId(units[0]?.id)
    }, [isLoading]);
    
    return (
        <div className="battalion">
            <Layout>
                <HeaderApp />

                <Content>
                    {isLoading && <Loader/>}
                    
                    {!isLoading && (
                        <Row gutter={24}>
                            <Col span={8}>
                                <Card bordered={false} className="battalion-unit-card-list">
                                    <UnitList units={units}
                                              selectedUnitId={selectedUnitId}
                                              pickUnit={pickUnit} />
                                </Card>
                            </Col>
                            <Col span={16}>
                                <Card bordered={false} className="battalion-unit-card">
                                    <SelectedUnit unitId={selectedUnitId} />
                                </Card>
                            </Col>
                        </Row>
                    )}
                </Content>
                
                <FooterApp />
            </Layout>
        </div>
    )
}
