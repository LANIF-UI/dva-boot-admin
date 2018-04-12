import React, { Component } from 'react';
import E from 'wangeditor';
import defaultConfig from './config';
import './style/index.less';

class Editor extends Component {
  constructor(props) {
    super();
    this.state = {
      value: props.value,
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps && this.props.value !== nextProps.value) {
      this.setState({
        value: nextProps.value
      });
    }
  }
  
  componentDidMount() {
    const { value, otherProps } = this.props;
    const dom = this.refs.editor;
    this.editor = new E(dom);
    this.editor.customConfig = {...defaultConfig, onchange: this.onChange, ...otherProps};
    this.editor.create();
    this.editor.txt.html(value);
  }

  onChange = html => {
    const { onChange } = this.props;
    if (onChange) onChange(html);

    this.setState({
      value: html
    })
  }

  render() {
    return <div className="antui-editor" ref="editor" />;
  }
}

export default Editor;