import React, {useEffect} from 'react';
import {Layout, Menu} from 'antd';
import {Link, useLocation} from "react-router-dom";
import {routes} from "../../routes";
import {useGetAuthToken} from "../../hooks/auth/useGetAuthToken";
import {useSignOut} from "../../hooks/auth/useSignOut";

const {Footer} = Layout;

export function FooterApp(props) {
    const location = useLocation();
    const token = useGetAuthToken();
    const signOut = useSignOut();
    
    const isAuthorized = !!token;
    
    const {pathname} = location;
    const splitLocation = pathname.split("/");
    
    const getActiveRouteClassName = (routeName) => {
        return '/' + splitLocation[1] === routeName ? 'active' : '';
    };
    
    return (
        <Footer>
            <Menu mode="horizontal">
                <Menu.Item key="1"
                            className="logo reset-style-button">
                </Menu.Item>

                <Menu.Item key="2"
                           className="reset-style-button">
                    <Link to={routes.dashboard}
                          className={getActiveRouteClassName(routes.dashboard)}>
                        <span className="icon dashboard-icon"></span>
                        Dashboard
                    </Link>
                </Menu.Item>
                
                <Menu.Item key="3"
                           className="reset-style-button">
                    <Link to={routes.battalion}
                          className={getActiveRouteClassName(routes.battalion)}>
                        <span className="icon battalion-icon"></span>
                        Battalion
                    </Link>
                </Menu.Item>
                
                <Menu.Item key="4"
                           className="reset-style-button">
                    <Link to={routes.deploy}
                          className={getActiveRouteClassName(routes.deploy)}>
                        <span className="icon deploy-icon"></span>
                        Deploy
                    </Link>
                </Menu.Item>
                
                <Menu.Item key="5"
                           className="disconnect-btn reset-style-button">
                    {isAuthorized && <span onClick={signOut}>
                        <span className="disconnect-btn-icon"></span>
                        DISCONNECT
                    </span>}
                </Menu.Item>
            </Menu>
        </Footer>
    )
}
