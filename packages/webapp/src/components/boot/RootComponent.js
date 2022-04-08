import React from "react";
import {ApolloProviderComponent} from "./ApolloProviderComponent";
import {BlockchainProviderComponent} from "./BlockchainProviderComponent";
import {UnitProviderComponent} from "./UnitProviderComponent";
import {AmmoProviderComponent} from "./AmmoProviderComponent";

export function RootComponent(props) {
    const {
        children
    } = props;
    
    return <ApolloProviderComponent>
        <BlockchainProviderComponent>
            <AmmoProviderComponent>
                <UnitProviderComponent>
                    {children}
                </UnitProviderComponent>
            </AmmoProviderComponent>
        </BlockchainProviderComponent>
    </ApolloProviderComponent>
}
