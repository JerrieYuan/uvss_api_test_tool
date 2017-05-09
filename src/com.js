/**
 * Created by jry on 17-3-2.
 */
import React, {
  Component
} from 'react';

import {
  CMD,
  KEY,
  VALUE,
  LABEL_LEN,
  INPUT_LEN,
  randId
} from './static.js';

const Rb = require('react-bootstrap');

class UTTCMD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cmds: ["get"],
      params: []
    };
  }

  handleChange(e) {
    this.props.data[CMD] = e.target.value; //parseInt(e.target.value,10);
    console.log(e.target.value);
    console.log(this.state);
    if (e.target.value == "set") {
      this.props.changeCmd(this.state.params);
    } else {
      this.props.changeCmd([]);
    }
  }


  componentDidUpdate(prevProps, prevState) {
    let e = {
      target: {
        value: "get"
      }
    };
    this.handleChange(e);
  }

  oneOption(cmd) {
    return <option value={cmd} key={randId()}>{cmd}</option>
  }

  render() {
    return (
      <Rb.FormGroup controlId={`${this.props.type}_${CMD}`}>
        <Rb.Col componentClass={Rb.ControlLabel} sm={LABEL_LEN}>{CMD}</Rb.Col>
        <Rb.Col sm={INPUT_LEN}>
          <Rb.FormControl defaultValue={this.props.data[CMD]} componentClass="select" placeholder="select" onChange={this.handleChange.bind(this)}>
            {this.state.cmds.map(this.oneOption)}
          </Rb.FormControl>
        </Rb.Col>
      </Rb.FormGroup>
    );
  }
}

const CMDS_GET = 1;
const CMDS_SET = 2;
const CMDS_SET_AND_GET = 3;

const newCmdObj = (cmds, params = []) => {
  let obj = {};
  switch (cmds) {
    case CMDS_GET:
      obj.GET = [];
      // statements_1
      break;
    case CMDS_SET:
      obj.SET = params;
      break;
    case CMDS_SET_AND_GET:
      obj.GET = [];
      obj.SET = params;
      break;
    default:
      // statements_def
      break;
  }
  return obj;
}

class UTTKEY extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.VALUES = [
      "device id",
      "device ip",
      "gateway",
      "netmask",
      "server ip",
      "trigger type",
      "test image",
      "remove image",
      "reboot"
    ];
    this.DefaultOption = this.VALUES[0];
    this.ValueMapCmds = {
      "device id": newCmdObj(CMDS_GET),
      "device ip": newCmdObj(CMDS_SET_AND_GET, ["ip"]),
      "gateway": newCmdObj(CMDS_SET_AND_GET, ["ip"]),
      "netmask": newCmdObj(CMDS_SET_AND_GET, ["ip"]),
      "server ip": newCmdObj(CMDS_SET_AND_GET, ["ip", "port"]),
      "trigger type": newCmdObj(CMDS_SET_AND_GET, ["sensor"]),
      "test image": newCmdObj(CMDS_GET),
      "remove image": newCmdObj(CMDS_SET, ["pic"]),
      "reboot": newCmdObj(CMDS_SET)
    };

  }

  handleChange(e) {
    this.props.data[KEY] = e.target.value;
    let cmdObj = this.ValueMapCmds[e.target.value];
    let data = {
      cmds: []

    };
    if (typeof cmdObj.GET != "undefined") {
      data.cmds.push("get");
    }
    if (typeof cmdObj.SET != "undefined") {
      data.cmds.push("set");
      data.params = cmdObj.SET;
    }
    this.props.changeKey(data);
    console.log(this.props.data);
  }

  render() {
    return (
      <Rb.FormGroup controlId={`${this.props.type}_${KEY}`}>
        <Rb.Col componentClass={Rb.ControlLabel} sm={LABEL_LEN}>{KEY}</Rb.Col>
        <Rb.Col sm={INPUT_LEN}>
          <Rb.FormControl defaultValue={this.props.data[KEY]} componentClass="select" placeholder="select" onChange={this.handleChange.bind(this)}>
            {this.VALUES.map((d)=>{
              return <option key={randId()} value={d}>{d}</option>;
            })}
          </Rb.FormControl>
        </Rb.Col>
      </Rb.FormGroup>
    );
  }
}

class UTTANITEM extends Component {
  changeKey(e) {
    this.props.data[KEY] = e.target.value;
  }

  changeValue(e) {
    this.props.data[VALUE] = e.target.value;
  }

  render() {
    return <Rb.FormGroup>
      <Rb.Col sm={LABEL_LEN}>
      <Rb.ControlLabel className="pull-right">
        {this.props.data[KEY]}
      </Rb.ControlLabel>
      </Rb.Col>
      <Rb.Col sm={INPUT_LEN}>
        <Rb.FormControl componentClass="input" placeholder={VALUE} onChange={this.changeValue.bind(this)} defaultValue={this.props.data[VALUE]} />
      </Rb.Col>
    </Rb.FormGroup>
  }
}

module.exports = {
  UTTCmd: UTTCMD,
  UTTKey: UTTKEY,
  UTTAnItem: UTTANITEM
};