import React from 'react';
import PropTypes from 'prop-types'
import {Icon} from 'antd';
import classNames from 'classnames';

function noop() {
}

export default class List extends React.Component {
  static defaultProps = {
    prefixCls: 'antui-transfer-tree-list',
    dataSource: [],
    rowKey: 'key',
    onDeleteItem: noop,
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    dataSource: PropTypes.array,
    rowKey: PropTypes.string,
    style: PropTypes.object,
    render: PropTypes.func,
    onDeleteItem: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: this.getDataSource(props)
    };
  }

  componentWillReceiveProps(nextProps) {
    const dataSource = this.getDataSource(nextProps);
    const st = {};

    if (dataSource) {
      st.dataSource = dataSource;
    }
    this.setState(st);
  }

  getDataSource(props) {
    let dataSource = [];
    if ("dataSource" in props) {
      dataSource = props.dataSource;
    }
    return dataSource;
  }

  handleDeleteItem = (e, items) => {
    e.preventDefault();
    e.stopPropagation();

    this.props.onDeleteItem(items ? items : this.state.dataSource);
  }

  renderItem = (i, key) => {
    const {render, titleKey, rowKey} = this.props;

    let item = this.state.dataSource[i];
    
    return (
      <li className="list-comp-item" data-key={item[rowKey]}
        title={item[titleKey]}
        key={item[rowKey]}
      >
        <span className="list-comp-item-body">{render ? render(item) : item.title}</span>
        <a className={`list-comp-clear-item`} onClick={(e) => this.handleDeleteItem(e, [item])}>
          <Icon type="cross" />
        </a>
      </li>
    );
  }

  render() {
    const { prefixCls, notFoundContent, style } = this.props;

    const listCls = classNames({
      [prefixCls]: true
    });

    let unit = '条';

    return (
      <div className={listCls} style={style}>
        <div className={`${prefixCls}-header`}>
          <span className={`${prefixCls}-header-selected`}>
            <span>
              {this.state.dataSource.length} {unit}
            </span>
            <span className={`${prefixCls}-header-title`}>
              <a className={`${prefixCls}-clear-all`} onClick={(e) => this.handleDeleteItem(e)}>
                删除所有
              </a>
            </span>
          </span>
        </div>
        <div className={`${prefixCls}-body`}>
          <div className={`${prefixCls}-body-content`}>
            {!!this.state.dataSource.length || <div className={`${prefixCls}-body-content-not-found`}>{notFoundContent || '列表为空'}</div>}
            {this.state.dataSource.map((item, i) => this.renderItem(i, item[this.props.rowKey]))}
          </div>
        </div>
      </div>
    );
  }
}