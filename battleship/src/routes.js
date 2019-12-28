import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home'

const routing = () => (
    <div>
    <Switch>
    <Route exact path="/" component={Home} label="Home"/>
    </Switch>
    </div>
)
export default routing;