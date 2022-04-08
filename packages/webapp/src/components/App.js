import React from 'react';
import {Route, Router as BrowserRouter, Switch} from 'react-router-dom';
import {routes} from '../routes';
import {history} from '../history';
import '../styles/index.scss';
import 'antd/dist/antd.css';
import {Dashboard} from './dashboard/Dashboard';
import {Battalion} from "./battalion/Battalion";
import {Deploy} from "./deploy/Deploy";

export function App(props) {
    return (
        <BrowserRouter history={history}>
                <section className="app-layer">
                    <Switch>
                        <Route exact
                               path={routes.dashboard}
                               component={Dashboard}/>
                               
                        <Route exact
                               path={routes.battalion}
                               component={Battalion}/>
                               
                        <Route exact
                               path={routes.deploy}
                               component={Deploy}/>
                    </Switch>
                </section>
        </BrowserRouter>
    )
}
