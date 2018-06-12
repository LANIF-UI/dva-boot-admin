import React from 'react';
import { Input, Icon } from 'antd';
import $$ from 'cmn-utils';

export default class Search extends React.PureComponent {
  static defaultProps = {
    placeholder: ''
  };

  state = {
    value: '',
  }

  constructor(props) {
    super(props);
    this.onChange = $$.debounce(props.onChange, 500);
  }

  handleChange = value => {
    const onChange = this.props.onChange;
    if (onChange) {
      this.onChange(value);
    }
    this.setState({
      value
    })
  };

  handleClear = e => {
    e.preventDefault();

    const handleClear = this.props.handleClear;
    if (handleClear) {
      handleClear(e);
    }
    this.setState({
      value: ''
    })
  };

  render() {
    const { placeholder, prefixCls } = this.props;
    const icon =
      this.state.value && this.state.value.length > 0 ? (
        <a className={`${prefixCls}-action`} onClick={this.handleClear}>
          <Icon type="cross-circle" />
        </a>
      ) : (
        <span className={`${prefixCls}-action`}>
          <Icon type="search" />
        </span>
      );
    return (
      <div>
        <Input
          placeholder={placeholder}
          className={prefixCls}
          value={this.state.value}
          ref="input"
          onChange={e => this.handleChange(e.target.value)}
        />
        {icon}
      </div>
    );
  }
}
