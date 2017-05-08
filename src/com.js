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

  handleChange(e) {
    this.props.data[CMD] = e.target.value; //parseInt(e.target.value,10);
    console.log(this.props);
  }

  render() {
    return (
      <Rb.FormGroup controlId={`${this.props.type}_${CMD}`}>
        <Rb.Col componentClass={Rb.ControlLabel} xs={LABEL_LEN}>{CMD}</Rb.Col>
        <Rb.Col xs={INPUT_LEN}>
          <Rb.FormControl defaultValue={this.props.data[CMD]} componentClass="select" placeholder="select" onChange={this.handleChange.bind(this)}>
            <option value="get">Get</option>
            <option value="set">Set</option>
          </Rb.FormControl>
        </Rb.Col>
      </Rb.FormGroup>
    );
  }
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
      "remove image",
      "reboot"
    ];
    this.DefaultOption = this.VALUES[0];
  }

  handleChange(e) {
    this.props.data[KEY] = e.target.value;
    console.log(this.props.data);
  }

  render() {
    return (
      <Rb.FormGroup controlId={`${this.props.type}_${KEY}`}>
        <Rb.Col componentClass={Rb.ControlLabel} xs={LABEL_LEN}>{KEY}</Rb.Col>
        <Rb.Col xs={INPUT_LEN}>
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
      <Rb.Col xs={6} >
        <Rb.FormControl componentClass="input" placeholder={KEY} onChange={this.changeKey.bind(this)} defaultValue={this.props.data[KEY]}/>
      </Rb.Col>
      <Rb.Col xs={6}>
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