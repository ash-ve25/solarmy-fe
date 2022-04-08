import React from 'react';
import {Card, Col, Layout, Row} from 'antd';
import {Battalion} from "./Battalion";
import {HeaderApp} from "../header-app/HeaderApp";
import {FooterApp} from "../footer-app/FooterApp";
import {Link} from "react-router-dom";
import {routes} from "../../routes";

const {Content} = Layout;

export function Dashboard(props) {    
    return (
        <div className="dashboard">
            <Layout>
                <HeaderApp></HeaderApp>

                <Content>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card title="Badges" bordered={false}>
                                Will be available soon
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Mission Leadrbords" bordered={false}>
                                Will be available soon
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title={<Link to={routes.battalion}>Battalion</Link>} bordered={false}>
                                <Battalion />
                            </Card>
                        </Col>
                    </Row>
                </Content>

                <FooterApp></FooterApp>
            </Layout>
        </div>
    )
}
