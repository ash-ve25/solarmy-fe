import React, {useEffect} from 'react';
import {TopMenu} from "../top-menu/TopMenu";
import {Layout} from 'antd';

const {Header} = Layout;

export function HeaderApp(props) {
    
    return (
        <Header>
            <TopMenu />
        </Header>
    )
}
