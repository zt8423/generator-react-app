import React, {Component} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Home from '../Home';
import {RouterPath} from '../../contants/RouterContant';

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path={RouterPath} component={Home}/>
                </Switch>
            </BrowserRouter>
        )
    }
}
