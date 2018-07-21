import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import DataTable from '../DataTable';
import $$ from 'cmn-utils';
import isEqual from 'react-fast-compare';
const Pagination = DataTable.Pagination;

/**
 *  formItem: {
      type: 'table',
      rowKey: 'id',
      titleKey: 'name',
      dataSource,
      columns: innerColumns,
      onChange: (form, value) => console.log('。。。:', value),
      loadData: self.onLoadTableData,
      initialValue: [11, 3, 5],
    }
 */
class TableControlled extends Component {
  static propTypes = {
    value: PropTypes.array,
    dataSource: PropTypes.object,
    onChange: PropTypes.func
  };

  static defaultProps = {
    rowKey: 'id',
    titleKey: 'title',
    modal: {}
  };

  constructor(props) {
    super(props);
    const { value, dataSource } = props;
    this.state = {
      value: value,
      dataSource: dataSource,
      visible: false,
      loading: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { dataSource, value } = nextProps;
    if (
      !isEqual(this.props.dataSource, dataSource) ||
      !isEqual(this.props.value, value)
    ) {
      this.setState({
        dataSource: dataSource,
        value: value
      });
    }
  }

  onSelect = (keys, rows) => {
    this.setState({ value: keys });

    const onChange = this.props.onChange;
    if (onChange) {
      onChange(keys, rows);
    }
  };

  async onChange({ pageNum, pageSize }) {
    const loadData = this.props.loadData;

    if (loadData) {
      this.setState({
        loading: true
      });

      const dataSource = await loadData({ pageNum, pageSize });

      this.setState({
        loading: false,
        dataSource: dataSource || this.props.dataSource
      });
    }
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  hideModal = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const {
      modal,
      columns,
      titleKey,
      rowKey,
      selectType,
      ...otherProps
    } = this.props;
    const { dataSource, value, loading } = this.state;

    const dataTableProps = {
      loading,
      columns,
      rowKey,
      dataItems: dataSource,
      selectedRowKeys: value,
      selectType: typeof selectType === 'undefined' ? 'checkbox' : selectType,
      showNum: true,
      isScroll: true,
      onChange: ({ pageNum, pageSize }) => this.onChange({ pageNum, pageSize }),
      onSelect: (keys, rows) => this.onSelect(keys, rows)
    };

    if (modal) {
      return (
        <div>
          <Button onClick={this.showModal}>请选择{otherProps.title}</Button>&nbsp;
          {value && value.length ? <span>已选择：{value.length}项</span> : null}
          <Modal
            className="antui-table-modal"
            title={'请选择' + otherProps.title}
            visible={this.state && this.state.visible}
            width={modal.width || 600}
            onOk={this.hideModal}
            onCancel={this.hideModal}
            footer={[
              <Pagination
                key="paging"
                size="small"
                showSizeChanger={false}
                showQuickJumper={false}
                {...dataTableProps}
              />,
              <Button key="back" onClick={this.hideModal}>
                取消
              </Button>,
              <Button key="submit" type="primary" onClick={this.hideModal}>
                确定
              </Button>
            ]}
            {...modal}
          >
            <DataTable {...dataTableProps} />
          </Modal>
        </div>
      );
    }

    return (
      <DataTable
        pagination={{
          showSizeChanger: false,
          showQuickJumper: false
        }}
        {...dataTableProps}
      />
    );
  }
}

/**
 * TableForm组件
 */
export default ({
  form,
  name,
  dict,
  formFieldOptions = {},
  record,
  initialValue,
  rules,
  onChange,
  dataSource,
  normalize,
  ...otherProps
}) => {
  const { getFieldDecorator } = form;

  let initval = initialValue;

  if (record) {
    initval = record[name];
  }

  // 如果存在初始值
  if (initval !== null && typeof initval !== 'undefined') {
    if ($$.isFunction(normalize)) {
      formFieldOptions.initialValue = normalize(initval);
    } else {
      formFieldOptions.initialValue = initval;
    }
  }

  // 如果有rules
  if (rules && rules.length) {
    formFieldOptions.rules = rules;
  }

  // 如果需要onChange
  if (typeof onChange === 'function') {
    formFieldOptions.onChange = (value, rows) => onChange(form, value, rows); // form, value
  }

  return getFieldDecorator(name, formFieldOptions)(
    <TableControlled dataSource={dataSource} {...otherProps} />
  );
};
