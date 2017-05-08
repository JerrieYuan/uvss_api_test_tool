/**
 * Created by jry on 17-3-2.
 */

import React, {
  Component
} from 'react';
import {
  CMD,
  KEY,
  CODE,
  VALUE,
  LABEL_LEN,
  INPUT_LEN,
  randId
} from './static.js';

const Rb = require('react-bootstrap');

class UTTCmd extends Component {
  render() {
    let mp = ["", "get", "set"];
    let defaultData = this.props.data[CMD];

    return (
      <Rb.FormGroup controlId={`${this.props.type}_${CMD}`}>
        <Rb.Col componentClass={Rb.ControlLabel} xs={LABEL_LEN}>{CMD}</Rb.Col>
        <Rb.Col xs={INPUT_LEN}>
          <Rb.FormControl value={defaultData} componentClass="input" readOnly />
        </Rb.Col>
      </Rb.FormGroup>
    );
  }
}

class UTTKey extends Component {
  render() {
    return (
      <Rb.FormGroup controlId={`${this.props.type}_${KEY}`}>
        <Rb.Col componentClass={Rb.ControlLabel} xs={LABEL_LEN}>{KEY}</Rb.Col>
        <Rb.Col xs={INPUT_LEN}>
          <Rb.FormControl value={this.props.data[KEY]} componentClass="input" readOnly />
        </Rb.Col>
      </Rb.FormGroup>
    );
  }
}

class UTTAnItem extends Component {
  render() {
    return <Rb.FormGroup>
      <Rb.Col xs={6} >
        <Rb.FormControl componentClass="input" placeholder={KEY} defaultValue={this.props.data[KEY]} readOnly/>
      </Rb.Col>
      <Rb.Col xs={6}>
        <Rb.FormControl componentClass="input" placeholder={VALUE} defaultValue={this.props.data[VALUE]} readOnly />
      </Rb.Col>
    </Rb.FormGroup>
  }
}

class UTTValue extends Component {

  rangeItems() {
    let items = this.props.data[VALUE];
    if (typeof items === "undefined" || items == null) {
      items = [];
    }

    if (items.length === 0) {
      return <Rb.FormControl componentClass="input" readOnly value="null" />
    } else {
      return items.map(this.setItem.bind(this));
    }
  }

  setItem(d) {
    return (
      <UTTAnItem key={randId()} data={d}/>
    );
  }
  render() {

    return (
      <Rb.FormGroup controlId={`${this.props.type}_${KEY}`}>
        <Rb.Col componentClass={Rb.ControlLabel} xs={LABEL_LEN}>{VALUE}</Rb.Col>
        <Rb.Col xs={INPUT_LEN}>
          <div>
            {this.rangeItems()}
          </div>
        </Rb.Col>
      </Rb.FormGroup>
    );
  }
}

class UTTCode extends Component {
  render() {
    let status = this.props.data[CODE] || "null";
    return (<Rb.FormGroup>
      <Rb.Col componentClass={Rb.ControlLabel} xs={LABEL_LEN}>{CODE}</Rb.Col>
      <Rb.Col xs={INPUT_LEN}>
        <Rb.FormControl componentClass="input" readOnly value={status} />
      </Rb.Col>
    </Rb.FormGroup>);
  }
}

class UTTText extends Component {
  style() {
    return {
      maxWidth: "100%",
      minHeight: "100px"
    };
  }
  render() {
    let text = JSON.stringify(this.props.data);
    return (
      <Rb.FormGroup>
        <Rb.Col xs={12} sm={12} md={12} lg={12}>
          <div>
            <Rb.FormControl componentClass="textarea" value={text} readOnly style={this.style()} />
          </div>
        </Rb.Col>
      </Rb.FormGroup>
    );
  }
}

class RecvPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        cmd: "get",
        key: "device id",
        value: []
      },
      type: "get",
    };
  }
  onReceive(data) {
    this.setState({
      data: data
    });
  }

  render() {
    return (
      <div>
        <Rb.Form horizontal>
          <UTTCmd {...this.state} />
          <UTTKey {...this.state} />
          <UTTCode {...this.state} />
          <UTTValue {...this.state} />
          <UTTText {...this.state} />

        </Rb.Form>
      </div>
    );
  }
}

module.exports = {
  UTTRecvPanel: RecvPanel
};