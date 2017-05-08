import React from 'react';
import ReactDOM from 'react-dom';
//import {remote} from 'electron';
import {App} from './App';

import  './css/bootstrap.css';

//const Menu = remote.Menu;
//const MenuItem = remote.MenuItem;

//let menu = new Menu();

//menu.append(new MenuItem({label:'Opendevtool',click:function(e){}}))

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
