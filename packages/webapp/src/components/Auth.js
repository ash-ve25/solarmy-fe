import React from 'react';
import {useSignIn} from "../hooks/auth/useSignIn";
import {Col, Row} from 'antd';
import '../styles/index.scss';
import 'antd/dist/antd.css';

export function Auth(props) {
    const {
        locale = 'en'
    } = props;
    
    const signUp = useSignIn();
    
    const signUpViaPhantom = () => signUp('phantom');
    const SignUpViaSolflare = () => signUp('solflare');
    
    return (
        <Row id="auth"
             align="bottom">
            <Col span={24}>
                <div>
                    <span className="login-btn" onClick={() => {}}></span>
                </div>
                <div>
                    <span className="title">SOLDIERS</span>
                </div>
                <div className="buttons-wrapper">
                    <span className="buttons-title">CONNECT WALLET</span>
                    
                    <button className="btn phantom" onClick={signUpViaPhantom}>PHANTOM</button>
                    <button className="btn solflare" onClick={SignUpViaSolflare}>SOLFLARE</button>
                </div>
            </Col>
        </Row>
    )
}
