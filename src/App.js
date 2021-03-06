import React, {
  Component
} from 'react';
import {
  UTTSendPanel
} from './send.js';
import {
  UTTRecvPanel
} from './recv';
//import $ from 'jquery';
//import jQuery from 'jquery';
//import bootstrap from 'bootstrap'


//const jQuery = require('jquery');
//const $ = require('jquery');
const Rb = require('react-bootstrap');

class UTTPanel extends Component {

  onRecv(data) {
    this.refs["recv"].onReceive.bind(this.refs["recv"])(data);
  }

  render() {
    //              <UTTRecvPanel />
    return (
      <Rb.Grid>
        <Rb.Row>
          <Rb.Col md={6}>
            <Rb.Panel header="Send message">
              <UTTSendPanel onRecv={this.onRecv.bind(this)} />
            </Rb.Panel>
          </Rb.Col>
          <Rb.Col md={6}>
            <Rb.Panel header="Message from device">
              <UTTRecvPanel ref="recv" />
            </Rb.Panel>
          </Rb.Col>
        </Rb.Row>
        <Rb.Row>
          <p style={{textAlign:"center"}}>
            Download the test Server : {"  "}
            <a href="./downloads/server.bin">Linux</a> | <a href="./downloads/server.exe">Windows</a>
          </p>
        </Rb.Row>
      </Rb.Grid>
    );
  }
}

class App extends Component {
  render() {
    return (
      <UTTPanel/>
    );
  }
}

module.exports = {
  App: App
};