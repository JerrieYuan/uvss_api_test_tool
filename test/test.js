/**
 * Created by jry on 17-4-5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
//import '../src/css/bootstrap.default.css';
//import {hashHistory,Route,Router,IndexRoute} from 'react-router';

import {App} from '../src/App';
//import {Login} from '../src/js/comps/login';

console.log(App);


ReactDOM.render(
  <App />,document.getElementById('root')
);

/*
 //<IndexRoute component={App}/>
 ReactDOM.render((
 <Router history={hashHistory}>
 <Route path="/" component={Login} />
 <Route path="/login" component={Login} />
 </Router>),
 document.getElementById('root'));
 */
