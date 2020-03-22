import React from 'react';
import PropTypes from 'prop-types';
import List from './List';
import ListTree from './ListTree';
import { RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import './style/index.less';

function noop() {}

export default class TransferTree extends React.Component {
  static defaultProps = {
    prefixCls: 'antui-transfer-tree',
    dataSource: [],
    onChange: noop,
    titleText: '源列表',
    treeKey: 'key',
    treeTitleKey: 'title',
    showSearch: false,
    footer: noop,
    loading: false
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    dataSource: PropTypes.array,
    targetNodes: PropTypes.array,
    onChange: PropTypes.func,
    listStyle: PropTypes.object,
    listRender: PropTypes.func,
    treeKey: PropTypes.string,
    treeTitleKey: PropTypes.string,
    className: PropTypes.string,
    titleText: PropTypes.string,
    showSearch: PropTypes.bool,
    searchPlaceholder: PropTypes.string,
    notFoundContent: PropTypes.node,
    footer: PropTypes.func,
    treeRender: PropTypes.func,
    loadData: PropTypes.func,
    loading: PropTypes.bool,
    asyncSearch: PropTypes.func,
    max: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {
      leftFilter: '',
      rightFilter: '',
      dataSource: props.dataSource,
      targetNodes: props.targetNodes,
      selectedKeys: props.targetNodes
        ? props.targetNodes.map(node => node[props.treeKey])
        : null
    };
    if (props.showSearch) {
      this.flatTreeData = this.getFlatTreeData(props.dataSource);
    }
  }

  getFlatTreeData(treeData) {
    let data = [];
    treeData.forEach(item => {
      if (item.children) {
        data = data.concat(this.getFlatTreeData(item.children));
      } else {
        data.push(item);
      }
    });
    return data;
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.targetNodes !== prevProps.targetNodes ||
      this.props.dataSource !== prevProps.dataSource
    ) {
      if (this.props.targetNodes) {
        this.setState({
          targetNodes: this.props.targetNodes,
          selectedKeys: this.props.targetNodes.map(node => node[this.props.treeKey])
        });
      }
      if (this.props.dataSource) {
        this.setState({
          dataSource: this.props.dataSource
        });
      }
      if (this.props.showSearch) {
        this.flatTreeData = this.getFlatTreeData(this.props.dataSource);
      }
    }
  }

  handleFilter = (direction, v) => {
    this.setState({
      [`${direction}Filter`]: v
    });
  };

  handleLeftFilter = v => this.handleFilter('left', v);
  handleRightFilter = v => this.handleFilter('right', v);

  handleClear = direction => {
    this.setState({
      [`${direction}Filter`]: ''
    });
  };

  handleRightClear = () => this.handleClear('right');
  handleDeleteItem = nodes => {
    const { treeKey } = this.props;
    const targetNodes = this.state.targetNodes.filter(
      node => !nodes.some(item => item[treeKey] === node[treeKey])
    );
    const targetKeys = targetNodes.map(node => node[treeKey]);

    this.setState({
      selectedKeys: targetKeys,
      targetNodes: targetNodes
    });

    this.props.onChange && this.props.onChange(targetKeys, targetNodes);
  };

  onTreeSelected = selectedNodes => {
    const { treeKey, max } = this.props;

    if (max && selectedNodes.length > max) {
      console.error('error, selected number > max');
      const { targetKeys, targetNodes } = this.state;
      this.props.onChange &&
        this.props.onChange(targetKeys, targetNodes, 'OutOfMaxSize');
      return;
    }

    const targetKeys = selectedNodes.map(node => node[treeKey]);

    this.setState({
      selectedKeys: targetKeys,
      targetNodes: selectedNodes
    });

    this.props.onChange && this.props.onChange(targetKeys, selectedNodes);
  };

  render() {
    const {
      prefixCls,
      titleText,
      showSearch,
      notFoundContent,
      treeKey,
      treeTitleKey,
      searchPlaceholder,
      footer,
      listStyle,
      className,
      listRender,
      treeRender,
      loadData,
      loading,
      asyncSearch,
      max
    } = this.props;
    const {
      leftFilter,
      rightFilter,
      selectedKeys,
      targetNodes,
      dataSource
    } = this.state;

    const cls = classNames({
      [className]: !!className,
      [prefixCls]: true
    });

    return (
      <div className={cls}>
        <ListTree
          titleText={titleText}
          loadData={loadData}
          asyncSearch={asyncSearch}
          treeData={dataSource}
          flatTreeData={this.flatTreeData}
          selectedKeys={selectedKeys}
          selectedNodes={targetNodes}
          treeKey={treeKey}
          treeTitleKey={treeTitleKey}
          render={treeRender}
          style={listStyle}
          filter={leftFilter}
          handleFilter={this.handleLeftFilter}
          onTreeSelected={this.onTreeSelected}
          showSearch={showSearch}
          searchPlaceholder={searchPlaceholder}
          notFoundContent={notFoundContent}
          footer={footer}
          prefixCls={`${prefixCls}-list`}
          loading={loading}
        />
        <div className={`${prefixCls}-operation`}>
          <RightOutlined />
        </div>
        <List
          filter={rightFilter}
          dataSource={targetNodes}
          style={listStyle}
          onDeleteItem={this.handleDeleteItem}
          render={listRender}
          notFoundContent={notFoundContent}
          prefixCls={`${prefixCls}-list`}
          max={max}
        />
      </div>
    );
  }
}
