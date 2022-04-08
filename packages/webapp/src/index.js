import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/App';
import {Auth} from './components/Auth';
import {RootComponent} from "./components/boot/RootComponent";
import {getToken, isTokenValid} from './utils';
import {ApolloProviderComponent} from "./components/boot/ApolloProviderComponent";

const isAuthorized = isTokenValid(getToken());

const auth = () => <ApolloProviderComponent><Auth /></ApolloProviderComponent>;
const app = () => <RootComponent><App /></RootComponent>

ReactDOM.render(isAuthorized ? app() : auth() , document.getElementById('app'));
