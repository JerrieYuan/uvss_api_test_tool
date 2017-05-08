/**
 * Created by jry on 17-3-2.
 */

import React, {
  Component
} from 'react';
import {
  KEY,
  PARAMS,
  LABEL_LEN,
  INPUT_LEN,
  DEFAULT_URL,
  DEFAULT_USER,
  DEFAULT_PASSWD,
  randId,
  isWeb
} from './static.js';
import {
  UTTCmd,
  UTTKey,
  UTTAnItem
} from './com.js';
import jQuery from 'jquery';

const Rb = require('react-bootstrap');
//const net = require('net');

class UTTBUTTON extends Component {
  sendMsg() {
    let str = JSON.stringify(this.props.data);
    let conf = this.props.others;
    let url = conf.url.replace(/http:\/\//ig, '');
    url = `http://${conf.user}:${conf.passwd}@${url}`;
    let fn = this.props.onRecv;

    if (isWeb) {
      fn(`${url}?${str}`);
    } else {
      jQuery.get(url, str, (data, status) => {
        console.log(data);
        let fn = this.props.onRecv;
        if (typeof data === "string") {
          try {
            data = JSON.parse(String(data));
          } catch (e) {
            // statements
            console.log(e);
          }
        }
        fn(data);
      });
    }

  }

  render() {
    return (
      <Rb.Button className="pull-right" bsStyle="primary" onClick={this.sendMsg.bind(this)}>Send Message</Rb.Button>
    );
  }
}

class UTTDEVICEIP extends Component {
  changeURL(e) {
    this.props.others.url = e.target.value;
  }

  changeUser(e) {
    this.props.others.user = e.target.value;
  }

  changePasswd(e) {
    this.props.others.passwd = e.target.value;
  }

  render() {
    return (
      <div>
      <Rb.FormGroup>
        <Rb.Col componentClass={Rb.ControlLabel} sm={LABEL_LEN}>URL</Rb.Col>
        <Rb.Col sm={INPUT_LEN}>
          <Rb.FormControl componentClass="input" placeholder="http://x.x.x.x/cgi-bin/xxx.cgi" onChange={this.changeURL.bind(this)} defaultValue={this.props.others.url} />
        </Rb.Col>
      </Rb.FormGroup>
        <Rb.FormGroup>
          <Rb.Col componentClass={Rb.ControlLabel} sm={LABEL_LEN}> Auth</Rb.Col>
          <Rb.Col sm={Math.floor(INPUT_LEN/2)}>
            <Rb.FormControl defaultValue={this.props.others.user} componentClass="input" placeholder="username" onChange={this.changeUser.bind(this)} />

          </Rb.Col>
          <Rb.Col sm={Math.floor(INPUT_LEN/2)}>
            <Rb.FormControl defaultValue={this.props.others.passwd} componentClass="input" placeholder="passwd" onChange={this.changePasswd.bind(this)}/>
          </Rb.Col>
        </Rb.FormGroup>
      </div>
    );
  }
}

class UTTPARAMS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.data.params
    };
  }

  setItem(d) {
    return (
      <UTTAnItem key={randId()} data={d}/>
    );
  }



  addItem() {
    let item = {
      key: "",
      value: ""
    };
    this.state.items.push(item);
    this.forceUpdate();
  }

  deleteItem() {
    if (this.state.items.length > 0) {
      this.state.items.pop();
      this.forceUpdate();
    }
  }

  render() {
    return (
      <Rb.FormGroup controlId={`${this.props.type}_${KEY}`}>
        <Rb.Col componentClass={Rb.ControlLabel} sm={LABEL_LEN}>{PARAMS}</Rb.Col>
        <Rb.Col sm={INPUT_LEN}>
          <div>
            {this.state.items.map(this.setItem.bind(this))}
          </div>
          <Rb.Button bsSize="small" onClick={this.addItem.bind(this)}>Add an Item</Rb.Button> {'  '}
          <Rb.Button bsSize="small" bsStyle="warning" onClick={this.deleteItem.bind(this)}>Delete an Item</Rb.Button>
        </Rb.Col>
      </Rb.FormGroup>
    );
  }
}

class UTTSendPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        cmd: "get",
        key: "device id",
        params: []
      },
      type: "set",
      others: {
        url: DEFAULT_URL,
        user: DEFAULT_USER,
        passwd: DEFAULT_PASSWD
      },
      onRecv: props.onRecv
    };
  }
  render() {
    return (
      <div>
        <Rb.Form horizontal>
          <UTTDEVICEIP {...this.state} />
          <UTTCmd {...this.state} />
          <UTTKey {...this.state} />
          <UTTPARAMS {...this.state} />
          <UTTBUTTON {...this.state}/>
        </Rb.Form>
      </div>
    );
  }
}

module.exports = {
  UTTSendPanel: UTTSendPanel
};