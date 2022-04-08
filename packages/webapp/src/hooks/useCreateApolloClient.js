import {useEffect, useState} from 'react';
import {ApolloLink} from 'apollo-link';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import {persistCache} from 'apollo-cache-persist';
import {getToken} from "../utils/token";

export function useCreateApolloClient(context) {
    const {dataUri} = context;
    const [cache] = useState(() => new InMemoryCache({addTypename: false}));
    const [link] = useState(() => ApolloLink.from([
        new ApolloLink((operation, forward) => {
            operation.setContext(({headers}) => ({
                headers: {
                    ...headers,
                    Authorization: `Bearer ${getToken()}`,
                },
            }));
            
            return forward(operation);
        }).concat(
            new HttpLink({
                uri: dataUri,
            }),
        ),
    ].filter(Boolean)));
    
    const [client] = useState(() => new ApolloClient({
        link,
        cache,
        defaultOptions: {watchQuery: {fetchPolicy: 'network-only'}},
        resolvers: {},
    }));
    
    useEffect(() => {
        persistCache({
            cache,
            key: 'apollo-storage',
            storage: window.localStorage,
        });
    }, [cache, link]);
    
    return client;
}
