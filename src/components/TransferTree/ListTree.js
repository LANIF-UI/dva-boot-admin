import React from 'react';
import PropTypes from 'prop-types';
import Search from './Search';
import { Tree, Spin } from 'antd';

function noop() {}

export default class ListTree extends React.Component {
  static defaultProps = {
    dataSource: [],
    titleText: '',
    treeKey: 'key',
    treeTitleKey: 'title',
    showSearch: false,
    handleClear: noop,
    handleFilter: noop,
    handleSelect: noop,
    handleSelectAll: noop
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    treeData: PropTypes.array,
    selectedKeys: PropTypes.array,
    showSearch: PropTypes.bool,
    searchPlaceholder: PropTypes.string,
    titleText: PropTypes.string,
    treeKey: PropTypes.string,
    treeTitleKey: PropTypes.string,
    style: PropTypes.object,
    handleClear: PropTypes.func,
    notFoundContent: PropTypes.string,
    filter: PropTypes.string,
    handleFilter: PropTypes.func,
    treeRender: PropTypes.func,
    loading: PropTypes.bool
  };

  state = {
    expandedKeys: [],
    autoExpandParent: true
  };

  handleFilter = e => {
    this.props.handleFilter(e.target.value);
  };

  handleClear = () => {
    this.props.handleFilter('');
  };

  renderTreeNodes = data => {
    const { treeKey, treeTitleKey } = this.props;

    return data.map(item => {
      const treeProps = {
        ...item,
        key: item[treeKey],
        title: item[treeTitleKey],
        dataRef: item
      };

      if (item.children) {
        return (
          <Tree.TreeNode {...treeProps}>
            {this.renderTreeNodes(item.children)}
          </Tree.TreeNode>
        );
      }
      return <Tree.TreeNode {...treeProps} />;
    });
  };

  onSelect = (selectedKeys, info) => {
    if (info.selected && info.node.props.dataRef) {
      if (info.node.props.loadData && !info.node.props.dataRef.isLeaf) {
        return;
      } else if (info.node.props.dataRef.children) {
        this.onExpand([info.node.props.eventKey], info);
        return;
      }
    }
    this.props.onTreeSelected(info.selectedNodes);
  };

  onExpand = (expandedKeys, info) => {
    if (
      info.event &&
      info.node.props.children
    ) {
      let concatKeys = [expandedKeys, this.state.expandedKeys].reduce(
        (prev, next) =>
          prev.filter(item => next.indexOf(item) === -1).concat(next)
      );

      if (
        this.state.expandedKeys.some(item => item === info.node.props.eventKey)
      ) {
        concatKeys = concatKeys.filter(
          item => item !== info.node.props.eventKey
        );
      }

      this.setState({ expandedKeys: concatKeys, autoExpandParent: false });
    } else {
      this.setState({ expandedKeys, autoExpandParent: false });
    }
  };

  render() {
    const {
      prefixCls,
      loading,
      treeData,
      titleText,
      loadData,
      filter,
      showSearch,
      style,
      selectedKeys
    } = this.props;

    const { expandedKeys } = this.state;

    let { searchPlaceholder, notFoundContent } = this.props;

    const showTree = (
      <Tree
        loadData={loadData}
        onSelect={this.onSelect}
        onExpand={this.onExpand}
        selectedKeys={selectedKeys}
        expandedKeys={expandedKeys}
        autoExpandParent={this.state.autoExpandParent}
        multiple
      >
        {this.renderTreeNodes(treeData)}
      </Tree>
    );

    return (
      <div className={prefixCls} style={style}>
        <div className={`${prefixCls}-header tree-title`}>{titleText}</div>
        <div
          className={
            showSearch
              ? `${prefixCls}-body ${prefixCls}-body-with-search`
              : `${prefixCls}-body`
          }
        >
          {showSearch ? (
            <div className={`${prefixCls}-body-search-wrapper`}>
              <Search
                prefixCls={`${prefixCls}-search`}
                onChange={this.handleFilter}
                handleClear={this.handleClear}
                placeholder={searchPlaceholder || '请输入搜索内容'}
                value={filter}
              />
            </div>
          ) : null}
          <div className={`${prefixCls}-body-content tree-content`}>
            {treeData.length ? (
              showTree
            ) : (
              <div className={`${prefixCls}-body-content-not-found`}>
                {loading ? (
                  <Spin spinning={loading} />
                ) : (
                  notFoundContent || '列表为空'
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
