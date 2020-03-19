import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import DataTable from './DataTable';
import $$ from 'cmn-utils';
import PageHelper from '@/utils/pageHelper';
import assign from 'object-assign';

const Pagination = DataTable.Pagination;

/**
 * loadData 风格异步加载的表格
 */
class LoadTable extends Component {
  static propTypes = {
    columns: PropTypes.array,
    value: PropTypes.array,
    dataSource: PropTypes.object,
    onChange: PropTypes.func,
    loadData: PropTypes.func
  };

  static defaultProps = {
    rowKey: 'id'
  };

  state = {
    value: [],
    rows: [],
    dataSource: PageHelper.create()
  }

  componentDidMount() {
    const { loadData } = this.props;
    if (loadData) {
      this.onChange({ pageNum: 1 });
    }
  }

  // 将值转成对像数组
  static getRows(value, oldValue = [], props) {
    const { rowKey } = props;
    if (value) {
      return value.map(item => {
        const oldv = oldValue.filter(jtem => jtem[rowKey] === item)[0];
        return typeof item === 'object' ? item : oldv || { [rowKey]: item };
      });
    }
    return [];
  }

  static getKeys(value, props) {
    const { rowKey } = props;
    if (value) {
      return value.map(item => ($$.isObject(item) ? item[rowKey] : item));
    }
    return [];
  }

  onSelect = (keys, rows) => {
    const { onChange } = this.props;
    this.setState({ value: keys, rows });

    if (onChange) {
      onChange(keys, rows);
    }
  };

  async onChange({ pageNum, pageSize }) {
    const { loadData } = this.props;
    const { dataSource } = this.state;

    if (loadData) {
      const newDataSource = await loadData(
        dataSource.jumpPage(pageNum, pageSize)
      );

      this.setState({
        dataSource: assign(dataSource, newDataSource)
      });
    }
  }

  onSelectChange = (value, option) => {
    const { rowKey, onChange } = this.props;
    const { rows } = this.state;
    const newRows = rows.filter(item => value.indexOf(item[rowKey]) !== -1);
    this.setState({
      value,
      rows: newRows
    });
    onChange && onChange(value, newRows);
  };

  render() {
    const {
      columns,
      rowKey,
      selectType,
      showNum,
      pagination,
      paginationContainer,
      ...otherProps
    } = this.props;
    const { dataSource, value } = this.state;

    const dataTableProps = {
      columns,
      rowKey,
      dataItems: dataSource,
      selectedRowKeys: value,
      selectType: typeof selectType === 'undefined' ? 'checkbox' : selectType,
      showNum: typeof showNum === 'undefined' ? true : showNum,
      isScroll: true,
      onChange: ({ pageNum, pageSize }) => this.onChange({ pageNum, pageSize }),
      onSelect: (keys, rows) => this.onSelect(keys, rows),
      pagination:
        pagination === false
          ? false
          : {
              showSizeChanger: false,
              showQuickJumper: false,
              ...pagination
            }
    };

    if (paginationContainer) {
      ReactDOM.createPortal(
        pagination === false ? null : (
          <Pagination
            key="paging"
            size="small"
            showSizeChanger={false}
            showQuickJumper={false}
            {...dataTableProps}
          />
        ),
        paginationContainer
      );
    }

    return <DataTable {...dataTableProps} />;
  }
}

export default LoadTable;
