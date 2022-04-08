import React, {useState} from 'react';

import {useAccountProfileQuery} from "../../hooks/account/useAccountProfileQuery";
import {Form, Input, Menu} from "antd";
import {useChangeAccountUsernameMutation} from "../../hooks/account/useChangeAccountUsernameMutation";
import {Loader} from '../ui/Loader';
import {useAmmo} from "../../hooks/ammo/useAmmo";

const {Item} = Form;

export function TopMenu(props) {
    const [isEditUsername, setEditUsername] = useState(false);
    
    const {data: {username: userNameFromQuery} = {}, loading: isLoadingProfile} = useAccountProfileQuery();
    const {data = {}, loading: isLoadingAmmo, refetch: refetchAmmo} = useAmmo();
    const [changeUsername, {data: {username: userNameFromMutation, loading: isChangingUsername}}] = useChangeAccountUsernameMutation();
    
    const username = userNameFromMutation || userNameFromQuery;
    const isLoadingUsername = isLoadingProfile || isChangingUsername;
    
    const formRules = {
        username: [{required: true, message: 'Please input your username!'}]
    };

    const {tokenAmount: {uiAmountString: amountAmmo = 0} = {}} = data;
    
    const submitForm = async (data) => {
        try {
            await changeUsername(data);
        } catch (e) {
        }
        
        setEditUsername(false);
    };
    const handleFormError = () => {
        //TODO implement
    };
    
    const handleUpdateUsername = (event) => {
        setEditUsername(true);
    };
    
    return (
        <div className="top-menu">
            <Menu mode="horizontal">
                <Menu.Item key="1"
                           className="reset-style-button">
                    <div className="profile-username">
                        
                        {isLoadingUsername && <Loader/>}
                        
                        {!isLoadingUsername && (
                            <>
                                <div className="profile-username-content">
                                    {!isEditUsername && (<div className="profile-username-content-item">
                                        <p>Playername</p>
                                        <p className="username">{username}</p>
                                    </div>)}
                                    <div className="profile-username-content-item">
                                        {isEditUsername && (
                                            <Form onFinish={submitForm}
                                                  onFinishFailed={handleFormError}
                                                  initialValues={{ username }}>
                                                
                                                <Item name="username"
                                                      rules={formRules.username}>
                                                    <Input/>
                                                </Item>
                                                
                                                <button className="username-save-button">Save</button>
                                            </Form>
                                        )}
                                        
                                        {!isEditUsername && (
                                            <button className="username-update-button"
                                                    onClick={(event) => handleUpdateUsername(event)}/>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    
                    </div>
                </Menu.Item>
                
                <Menu.Item key="2"
                           className="reset-style-button">
                    <div className="ammo-amount"
                         onClick={refetchAmmo}>
                        
                        <div className="amount-content">
                            {isLoadingAmmo && <Loader/>}
                            {!isLoadingAmmo && <p className="amount">{amountAmmo} Ammo</p>}
                        </div>
                    </div>
                </Menu.Item>
            </Menu>
        </div>
    )
}
