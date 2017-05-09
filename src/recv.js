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
  randId,
  isWeb
} from './static.js';

const Rb = require('react-bootstrap');

class UTTCmd extends Component {
  render() {
    let mp = ["", "get", "set"];
    let defaultData = this.props.data[CMD];

    return (
      <Rb.FormGroup controlId={`${this.props.type}_${CMD}`}>
        <Rb.Col componentClass={Rb.ControlLabel} sm={LABEL_LEN}>{CMD}</Rb.Col>
        <Rb.Col sm={INPUT_LEN}>
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
        <Rb.Col componentClass={Rb.ControlLabel} sm={LABEL_LEN}>{KEY}</Rb.Col>
        <Rb.Col sm={INPUT_LEN}>
          <Rb.FormControl value={this.props.data[KEY]} componentClass="input" readOnly />
        </Rb.Col>
      </Rb.FormGroup>
    );
  }
}

class UTTAnItem extends Component {
  render() {
    return <Rb.FormGroup>
      <Rb.Col sm={LABEL_LEN} >
        <Rb.ControlLabel className="pull-right">{this.props.data[KEY]}</Rb.ControlLabel>
      </Rb.Col>
      <Rb.Col sm={INPUT_LEN}>
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
      return null;
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
      <div>
        {this.rangeItems()}
      </div>
    );
  }
}

class UTTCode extends Component {
  render() {
    let status = this.props.data[CODE] || "null";
    return (<Rb.FormGroup>
      <Rb.Col componentClass={Rb.ControlLabel} sm={LABEL_LEN}>{CODE}</Rb.Col>
      <Rb.Col sm={INPUT_LEN}>
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
        <Rb.Col sm={12}>
          <div>
            <Rb.FormControl componentClass="textarea" value={text} readOnly style={this.style()} />
          </div>
        </Rb.Col>
      </Rb.FormGroup>
    );
  }
}

class LocalPanel extends Component {
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
    return (<div>
        <Rb.Form horizontal>
          <UTTCmd {...this.state} />
          <UTTKey {...this.state} />
          <UTTCode {...this.state} />
          <UTTValue {...this.state} />
          <UTTText {...this.state} />

        </Rb.Form>
      </div>);
  }
}

class WebPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onReceive(data) {
    if (data == this.state.url) {
      this.refs["iframe"].contentWindow.location.reload();
    } else {
      this.setState({
        url: data
      });
    }
  }

  render() {
    return (
      <iframe ref="iframe" src={this.state.url} width="100%" height="500px" frameBorder={0} />
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
    this.refs["stdout"].onReceive.bind(this.refs["stdout"])(data);
    console.log(data);
    console.log(this.refs["stdout"]);
  }

  render() {
    if (isWeb) {
      return (
        <WebPanel ref="stdout" />
      );
    } else {
      return (
        <LocalPanel ref="stdout" />
      );
    }
  }
}

module.exports = {
  UTTRecvPanel: RecvPanel
};