import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import DataTable from '../DataTable';
import $$ from 'cmn-utils';
import isEqual from 'react-fast-compare';
import PageHelper from '@/utils/pageHelper';
import assign from 'object-assign';
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
    onChange: PropTypes.func,
    loadData: PropTypes.func
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
      dataSource: dataSource || PageHelper.create(),
      visible: false,
      loading: false
    };
  }

  componentDidMount() {
    const { loadData } = this.props;
    if (loadData) {
      this.onChange({ pageNum: 1 });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dataSource, value, loadData } = nextProps;
    if (
      !isEqual(this.props.dataSource, dataSource) ||
      !isEqual(this.props.value, value)
    ) {
      const newState = { value };
      if (!loadData && dataSource) {
        newState.dataSource = dataSource;
      }

      this.setState(newState);
    }
  }

  onSelect = (keys, rows) => {
    this.setState({ value: keys, rows });

    const { onChange, modal } = this.props
    if (modal) {
      return
    }
    onChange && onChange(keys, rows);
  };

  async onChange({ pageNum, pageSize }) {
    const { loadData } = this.props;
    const { dataSource } = this.state;

    if (loadData) {
      this.setState({
        loading: true
      });

      const newDataSource = await loadData(
        dataSource.jumpPage(pageNum, pageSize)
      );

      this.setState({
        loading: false,
        dataSource: assign(dataSource, newDataSource)
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

  onSubmit = () => {
    this.setState({
      visible: false
    });

    const { value, rows } = this.state
    const { onChange } = this.props
    onChange && onChange(value, rows)
  }

  render() {
    const {
      modal,
      columns,
      titleKey,
      rowKey,
      selectType,
      showNum,
      value: propsValue,
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
      showNum: typeof showNum === 'undefined' ? true : showNum,
      isScroll: true,
      onChange: ({ pageNum, pageSize }) => this.onChange({ pageNum, pageSize }),
      onSelect: (keys, rows) => this.onSelect(keys, rows)
    };

    if (modal) {
      return (
        <div>
          <Button onClick={this.showModal}>
            { propsValue && propsValue.length
              ? <span>已选择：{propsValue.length}项</span>
              : <span>请选择{otherProps.title}</span>
            }
          </Button>
          <Modal
            className="antui-table-modal"
            title={'请选择' + otherProps.title}
            visible={this.state && this.state.visible}
            width={modal.width || 600}
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
              <Button key="submit" type="primary" onClick={this.onSubmit}>
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
  formFieldOptions = {},
  record,
  initialValue,
  rules,
  onChange,
  dataSource,
  normalize,
  rowKey,
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
    <TableControlled
      dataSource={dataSource}
      rowKey={rowKey || name}
      {...otherProps}
    />
  );
};
