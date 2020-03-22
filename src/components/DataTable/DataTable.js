import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination, Tooltip } from 'antd';
import objectAssign from 'object-assign';
import isEqual from 'react-fast-compare';
import { EditableCell } from './Editable';
import $$ from 'cmn-utils';
import cx from 'classnames';
import './style/index.less';

/**
 * 数据表格
 */
class DataTable extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    rowKey: PropTypes.string,
    /**
     * 详见帮助文档 column.js 用法
     */
    columns: PropTypes.array.isRequired,
    /**
     * 数据对像list为必需,如需表格自带分页需要在此提供分页信息 {pageNum:1, list:[], filters:{}, pageSize:10, total:12}
     */
    dataItems: PropTypes.object.isRequired,
    /**
     * 是否显示行序号
     */
    showNum: PropTypes.bool,
    /**
     * 是否奇偶行不同颜色
     */
    alternateColor: PropTypes.bool,
    /**
     * 多选/单选，checkbox 或 radio
     */
    selectType: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    /**
     * 选择功能的配置 参考antd的rowSelection配置项
     */
    rowSelection: PropTypes.object,
    /**
     * 指定选中项的 key 数组
     */
    selectedRowKeys: PropTypes.array,
    /**
     * 是否带滚动条,或者当作scroll参数
     */
    isScroll: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    /**
     * 是否增加表格内分页
     */
    pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    /**
     * 选中表格行回调 function(selectedRowKeys, selectedRows)
     */
    onSelect: PropTypes.func,
    /**
     * 外部获取数据接口 {pageNum:1, filters:{}, pageSize:10}
     */
    onChange: PropTypes.func
  };

  static defaultProps = {
    prefixCls: 'antui-datatable',
    alternateColor: true
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedRowKeys: props.selectedRowKeys,
      selectedRows: this.getSelectedRows(props.selectedRowKeys),
      tableHeight: null
    };
  }

  // 将值转成对像数组
  getSelectedRows(value, oldValue = [], rowKey) {
    if (value) {
      return value.map(item => {
        if (typeof item === 'object') {
          return item;
        } else {
          const oldv = oldValue.filter(jtem => jtem[rowKey] === item)[0];
          return oldv || { [rowKey]: item };
        }
      });
    }
    return [];
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(prevProps.selectedRowKeys, this.props.selectedRowKeys)) {
      this.setState({
        selectedRowKeys: this.props.selectedRowKeys,
        selectedRows: this.getSelectedRows(
          this.props.selectedRowKeys,
          prevState.selectedRows,
          this.props.rowKey
        )
      });
    }
  }

  tableOnRow = (record, index) => {
    const { selectType } = this.props;

    let keys = selectType === 'radio' ? [] : this.state.selectedRowKeys || [];
    let rows = selectType === 'radio' ? [] : this.state.selectedRows || [];

    let i = keys.indexOf(record[this._rowKey]);
    if (i !== -1) {
      keys.splice(i, 1);
      rows.splice(i, 1);
    } else {
      keys.push(record[this._rowKey]);
      rows.push(record);
    }

    this.onSelectChange([...keys], [...rows]);
  };

  onSelectChange = (selectedRowKeys, selectedRows) => {
    // 使用keys重新过滤一遍rows以key为准，解决keys与rows不同步问题
    // 并在每一行加一个rowKey字段
    selectedRows = selectedRows.filter(
      item => selectedRowKeys.indexOf(item[this._rowKey]) !== -1
    );

    this.setState({ selectedRowKeys, selectedRows }, () => {
      this.props.onSelect && this.props.onSelect(selectedRowKeys, selectedRows);
    });
  };

  handleTableChange = (pagination, filters, sorter) => {
    let pageNum = pagination.current || pagination;

    let sortMap = sorter.field
      ? {
          [sorter.field]: sorter.order === 'ascend' ? 'asc' : 'desc'
        }
      : sorter;
    this.props.onChange &&
      this.props.onChange({ pageNum, filters, sorter: sortMap });
  };

  onShowSizeChange = (pageNum, pageSize) => {
    this.props.onChange && this.props.onChange({ pageNum, pageSize });
  };

  render() {
    const {
      prefixCls,
      className,
      columns,
      dataItems,
      showNum,
      alternateColor,
      onChange,
      selectType,
      rowSelection,
      isScroll,
      pagination,
      rowKey,
      ...otherProps
    } = this.props;

    let classname = cx(prefixCls, className, {
      'table-row-alternate-color': alternateColor
    });

    let colRowKey = '';
    let hasLeftFixedCol = false; // 是否有左侧的固定列
    // 默认宽度
    let cols = columns
      .filter(col => {
        if (col.primary) colRowKey = col.name;
        if (col.tableItem) {
          return true;
        } else {
          return false;
        }
      })
      .map(col => {
        let item = col.tableItem;
        // select 字典加强
        if (col.dict && !item.render) {
          item.render = (text, record) => {
            return (
              col.dict &&
              col.dict
                .filter(dic => dic.code === text)
                .map(dic => dic.codeName)[0]
            );
          };
        }
        // 是否有左侧固定列
        if (item.fixed === true || item.fixed === 'left') {
          hasLeftFixedCol = true;
        }
        // 如果指定了type字段，则使用指定类型渲染这个列
        const myRender = item.render;
        if (item.type) {
          item.render = (text, record, index) => {
            if ($$.isFunction(item.editing) && item.editing(text, record)) {
              return (
                <EditableCell
                  text={text}
                  record={record}
                  index={index}
                  field={col}
                />
              );
            } else {
              return $$.isFunction(myRender)
                ? myRender(text, record, index)
                : text;
            }
          };
        }
        return {
          title: col.title,
          dataIndex: col.name,
          ...item
        };
      })

    // 显示行号
    if (showNum) {
      cols.unshift({
        title: '序号',
        width: 50,
        dataIndex: '_num',
        ...(hasLeftFixedCol && { fixed: 'left' }),
        render(text, record, index) {
          const { pageNum, pageSize } = dataItems;
          if (pageNum && pageSize) {
            return (pageNum - 1) * pageSize + index + 1;
          } else {
            // 没有分页
            return index + 1;
          }
        }
      });
    }

    // 分页
    const paging = objectAssign(
      {
        total: dataItems.total,
        pageSize: dataItems.pageSize,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => `共 ${total} 条`,
        onShowSizeChange: this.onShowSizeChange
      },
      dataItems.pageNum && { current: dataItems.pageNum },
      pagination
    );

    const _rowSelection = {
      type: selectType === 'radio' ? 'radio' : 'checkbox',
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange,
      ...rowSelection
    };

    this._rowKey = rowKey || colRowKey;

    return (
      <div className={classname}>
        <Table
          size="small"
          rowSelection={selectType ? _rowSelection : null}
          onRow={
            selectType
              ? (record, index) => ({
                  onClick: _ => this.tableOnRow(record, index)
                })
              : () => {}
          }
          scroll={isScroll ? objectAssign({ x: '100%' }, isScroll) : {}}
          bodyStyle={{ overflowX: 'auto' }}
          columns={cols}
          pagination={pagination ? paging : false}
          dataSource={dataItems.list}
          onChange={this.handleTableChange}
          rowKey={this._rowKey}
          {...otherProps}
        />
      </div>
    );
  }
}

/**
 * 操作区 阻止向上冒泡
 */
export const Oper = prop => (
  <div className="table-row-button" onClick={e => e.stopPropagation()}>
    {prop.children}
  </div>
);

export const Tip = prop => (
  <Tooltip placement="topLeft" title={prop.children}>
    <div className="nobr" style={prop.style}>
      {prop.children}
    </div>
  </Tooltip>
);

export const Paging = ({ dataItems, onChange, ...otherProps }) => {
  const { total, pageSize, pageNum } = dataItems;
  const paging = {
    total: total,
    pageSize: pageSize,
    current: pageNum,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: total => `共 ${total} 条`,
    onShowSizeChange: (pageNum, pageSize) => onChange({ pageNum, pageSize }),
    onChange: pageNum => onChange({ pageNum }),
    ...otherProps
  };
  return <Pagination {...paging} />;
};

DataTable.Oper = Oper;
DataTable.Pagination = Paging;
DataTable.Tip = Tip;

export default DataTable;
