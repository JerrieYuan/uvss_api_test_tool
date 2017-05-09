/**
 * Created by jry on 17-4-5.
 */


import watcher from 'chokidar';
import React from 'react';
import ReactDOM from 'react-dom';

import {
  App
} from '../src/App';


//const watcher = require('chokidar');
let pre = 'add';
watcher.watch("./src/").on('all', (e, path) => {
  if ((pre != 'add' && pre != 'addDir') || (e != 'add' && e != 'addDir')) {
    console.log(e, path);
    let href = location.href;
    let list = href.split("#");
    //console.log(list[0])
    //location.href = list[0];
    location.reload();
    //location.href="./";
  }
  pre = e;
  //location.reload();
});



ReactDOM.render(
  <App />,
  document.getElementById('root')
);