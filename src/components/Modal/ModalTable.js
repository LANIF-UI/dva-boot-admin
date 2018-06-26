import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import cx from 'classnames';
import DataTable from '../DataTable';
import isEqual from 'react-fast-compare';
import SearchBar from '../SearchBar';
import './style/index.less';
const Pagination = DataTable.Pagination;

class ModalTable extends Component {
  constructor(props) {
    super(props);
    const { value, dataItems } = props;
    this.state = {
      value: value,
      dataItems: dataItems,
      visible: false,
      loading: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { dataItems, value, visible, loading } = nextProps;
    if (
      !isEqual(this.props.dataItems, dataItems) ||
      !isEqual(this.props.value, value) ||
      !isEqual(this.props.loading, loading)
    ) {
      this.setState({
        dataItems,
        value,
        loading
      });
    }
    if ('visible' in nextProps) {
      this.setState({
        visible: visible
      });
    }
  }

  onSelect = (keys, rows) => {
    this.setState({ value: keys });
  };

  async onChange({ pageNum, pageSize }) {
    const loadData = this.props.loadData;

    if (loadData) {
      this.setState({
        loading: true
      });

      const dataItems = await loadData({ pageNum, pageSize });

      this.setState({
        loading: false,
        dataItems: dataItems || this.props.dataItems
      });
    }
  }

  closeModal = () => {
    if (this.props.onCancel) {
      this.props.onCancel();
      return;
    }
    this.setState({
      visible: false
    });
  };

  onOk = () => {
    const { value } = this.state;
    const onSubmit = this.props.onSubmit;
    if (onSubmit) {
      onSubmit(value);
    }
  };

  render() {
    const {
      title,
      className,
      columns,
      modalOpts,
      rowKey,
      full,
      width,
      onSearch
    } = this.props;

    const { dataItems, value, loading, visible } = this.state;

    const classname = cx(className, 'antui-table-modal', 'antui-modalform', {
      'full-modal': full
    });

    const dataTableProps = {
      loading,
      columns,
      rowKey,
      dataItems,
      selectedRowKeys: value,
      selectType: 'checkbox',
      showNum: true,
      onChange: ({ pageNum, pageSize }) => this.onChange({ pageNum, pageSize }),
      onSelect: (keys, rows) => this.onSelect(keys, rows)
    };

    const searchBarProps = {
      columns,
      onSearch
    };

    const comp = <DataTable {...dataTableProps} />;

    const titleComp = (
      <div className="with-search-title">
        <div className="left-title">{title}</div>
        <SearchBar {...searchBarProps} />
      </div>
    );

    const modalProps = {
      closable: false,
      className: classname,
      confirmLoading: loading,
      visible,
      width: width || 600,
      style: { top: 20 },
      title: titleComp,
      destroyOnClose: true,
      onCancel: this.closeModal,
      onOk: this.onOk,
      footer: [
        <Pagination
          key="paging"
          size="small"
          showSizeChanger={false}
          showQuickJumper={false}
          {...dataTableProps}
        />,
        <Button key="back" onClick={this.closeModal}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={this.onOk}>
          确定
        </Button>
      ],
      ...modalOpts
    };

    return <Modal {...modalProps}>{comp}</Modal>;
  }
}

export default ModalTable;
