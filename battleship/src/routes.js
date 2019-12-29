import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home'
import CreateBoard from './components/CreateBoard'
import Userboards from './components/Userboards'


const routing = () => (
    <div>
    <Switch>
    <Route exact path="/" component={Home} label="Home"/>
    <Route exact path="/start-game" component={CreateBoard} label="CreateBoard"/>
    <Route exact path="/userboards" component={Userboards} label="Userboards"/>
    </Switch>
    </div>
)
export default routing;