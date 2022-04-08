import React from "react";
import {ApolloProvider} from "@apollo/client";
import {useCreateApolloClient} from "../../hooks/useCreateApolloClient";
import {Config} from '../../Config';

export function ApolloProviderComponent(props) {
    const {children} = props;
    
    const apolloClient = useCreateApolloClient({
        dataUri: Config.dataUri
    });
    
    return <ApolloProvider client={apolloClient}>
        {children}
    </ApolloProvider>
}
