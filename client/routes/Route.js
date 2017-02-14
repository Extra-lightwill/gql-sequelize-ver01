import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

import ViewerQuery from './ViewerQuery';
import AppContainer from '../components/App/AppContainer';
import SignupComponent from '../components/Signup/SignupComponent';
import LoginComponent from '../components/Login/LoginComponent';

import TasksMain from '../components/Pages/DbTest/TasksMain'; 

export default (
  <Route path='/' component={AppContainer} queries={ViewerQuery}>

    <Route path='/signup' component={SignupComponent} />
    <Route path='/login' component={LoginComponent} />

    <Route path="db-test" component={TasksMain} queries={ViewerQuery} />

    <Redirect from='*' to='/' />
  </Route>
);


/*

<IndexRoute component={FeatureContainer} queries={ViewerQuery} />

*/
