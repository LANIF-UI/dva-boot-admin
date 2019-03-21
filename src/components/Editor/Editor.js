import React, { PureComponent } from 'react';
import E from 'wangeditor';
import defaultConfig from './config';
import './style/index.less';

class Editor extends PureComponent {
  constructor(props) {
    super();
    this.state = {
      value: props.value
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        value: nextProps.value
      });
      this.onChange(nextProps.value);
    }
  }

  componentDidMount() {
    const { value, otherProps } = this.props;
    this.editor = new E(this.editorDom);
    this.editor.customConfig = {
      ...defaultConfig,
      onchange: this.onChange,
      ...otherProps
    };
    this.editor.create();
    this.editor.txt.html(value);
  }
  componentDidUpdate(prevProps, prevState) {
    if ('value' in this.props && prevState.value !== this.state.value) {
      this.editor.txt.html(this.state.value || '');
    }
  }

  onChange = html => {
    const { onChange } = this.props;
    if (onChange) onChange(html);
  };

  render() {
    return (
      <div
        className="antui-editor"
        ref={node => {
          this.editorDom = node;
        }}
      />
    );
  }
}

export default Editor;
