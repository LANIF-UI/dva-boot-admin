import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import cx from 'classnames';
import LoadTable from '../DataTable/LoadTable';
import SearchBar from '../SearchBar';
import './style/index.less';

class ModalTable extends Component {
  onSearch = (values, isReset) => {
    const { dataItems } = this.state;
    this.onChange({
      pageNum: 1,
      pageSize: dataItems.pageSize,
      filters: values
    });
  };

  onOk = () => {
    const { value, selectedRows } = this.state;
    const onSubmit = this.props.onSubmit;
    if (onSubmit) {
      onSubmit(value, selectedRows);
    }
  };

  render() {
    const {
      title,
      className,
      columns,
      tableProps,
      modalProps,
      rowKey,
      full,
      width,
      selectType,
      onCancel,
      onOk,
      visible,
      value,
      loading
    } = this.props;

    const classname = cx(className, 'antui-table-modal', 'antui-modalform', {
      'full-modal': full
    });

    const searchBarProps = {
      columns,
      onSearch: this.onSearch
    };

    const titleComp = title && (
      <div className="with-search-title">
        <div className="left-title">{title}</div>
        <SearchBar {...searchBarProps} />
      </div>
    );

    const _modalProps = {
      className: classname,
      confirmLoading: loading,
      visible,
      width: width || 600,
      style: { top: 20 },
      title: titleComp,
      destroyOnClose: true,
      onCancel: onCancel,
      onOk: this.onOk,
      footer: [
        <div
          key="footer-page"
          className="footer-page"
          ref={e => (this.paginationContainer = e)}
        ></div>,
        <Button key="back" onClick={onCancel}>
          取消
        </Button>,
        onOk && (
          <Button key="submit" type="primary" onClick={this.onOk}>
            确定
          </Button>
        )
      ],
      ...modalProps
    };

    return (
      <Modal {..._modalProps}>
        <LoadTable columns={columns} {...tableProps} />
      </Modal>
    );
  }
}

export default ModalTable;
