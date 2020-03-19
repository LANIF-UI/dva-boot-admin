import React from 'react';
import { connect } from 'dva';
import { Layout, Button } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
import { ModalTable } from 'components/Modal';
import columns from './columns';
import PageHelper from '@/utils/pageHelper';
import $$ from 'cmn-utils';
const { Content } = Layout;

@connect()
export default class extends BaseComponent {
  state = {
    visibleLoadTableModal: false
  };

  openLoadTableModal = () => {
    this.setState({
      visibleLoadTableModal: true
    });
  };

  onLoadData = pageInfo => {
    return $$.post('/datatable/getList', PageHelper.requestFormat(pageInfo))
      .then(resp => {
        return PageHelper.responseFormat(resp);
      })
      .catch(e => console.error(e));
  };

  render() {
    const { visibleLoadTableModal } = this.state;

    const tableProps = {
      loadData: this.onLoadData
    };
    const modalProps = {};

    return (
      <Layout className="full-layout page">
        <Content>
          <Panel title="LoadTable组件">
            <p>LoadTable组件异步加载数据</p>
            <Button.Group>
              <Button onClick={() => this.openLoadTableModal()}>
                LoadTable
              </Button>
            </Button.Group>
          </Panel>
        </Content>
        <ModalTable
          title="ModalTable"
          visible={visibleLoadTableModal}
          columns={columns}
          tableProps={tableProps}
          modalProps={modalProps}
          onCancel={e => this.setState({ visibleLoadTableModal: false })}
        />
      </Layout>
    );
  }
}
