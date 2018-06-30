import React from 'react';
import { connect } from 'dva';
import { Layout, Button } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Toolbar from 'components/Toolbar';
import SearchBar from 'components/SearchBar';
import DataTable from 'components/DataTable';
import { ModalForm } from 'components/Modal';
import createColumns from './columns';
const { Content, Header, Footer } = Layout;
const Pagination = DataTable.Pagination

@connect(({ crud, loading }) => ({
  crud,
  loading: loading.models.crud,
}))
export default class CRUD extends BaseComponent {
  state = {
    record: null,
    visible: false,
    rows: [],
  }

  componentDidMount() {
    const {dispatch, crud} = this.props;
    const {pageData} = crud;

    dispatch({
      type: 'crud/@request',
      payload: {
        valueField: 'pageData',
        url: '/crud/getList',
        pageInfo: pageData.startPage(1, 10),
      }
    });
  }

  handleUpdate = () => {
    
  }

  onSelectChange = (rows) => {
    this.setState({ rows });
  }
  
  handleDelete = (records) => {
    const {pageData} = this.props.crud;
    this.setState({rows:[]})
    this.props.dispatch({
      type: 'crud/@request',
      payload: [{
        notice: true,
        url: '/crud/bathDelete',
        data: records.map(item => item.id)
      }, {
        valueField: 'pageData',
        url: '/crud/getList',
        pageInfo: pageData,
      }]
    });
  }

  render() {
    const { crud, loading, dispatch } = this.props;
    const { pageData, employees } = crud;
    const columns = createColumns(this, employees);
    const { rows, record, visible } = this.state;

    const searchBarProps = {
      columns,
      onSearch: (values) => {
        dispatch({
          type: 'crud/@request',
          payload: {
            valueField: 'pageData',
            url: '/crud/getList',
            pageInfo: pageData.filter(values).jumpPage(1, 10),
          }
        });
      }
    };

    const dataTableProps = {
      loading,
      columns,
      rowSelection:{
        selectedRowKeys:rows,
        onChange: this.onSelectChange,
      },
      rowKey: 'id',
      dataItems: pageData,
      selectType: 'checkbox',
      showNum: true,
      isScroll: true,
      onChange: ({pageNum, pageSize}) => {
        dispatch({
          type: 'crud/@request',
          payload: {
            valueField: 'pageData',
            url: '/crud/getList',
            pageInfo: pageData.jumpPage(pageNum, pageSize),
          }
        });
      },
     
    }

    const modalFormProps = {
      loading,
      record,
      visible,
      columns,
      modalOpts: {
        width: 700,
      },
      onCancel: () => {
        this.setState({
          record: null,
          visible: false
        })
      },
      onSubmit: (values) => {
        dispatch({
          type: 'crud/@request',
          payload: [{
            notice: true,
            url: '/crud/save',
            data: values
          }, {
            valueField: 'pageData',
            url: '/crud/getList',
            pageInfo: pageData,
          }],
          success: () => {
            this.setState({
              record: null,
              visible: false
            })
          }
        });
      }
    };

    return (
      <Layout className="full-layout crud-page">
        <Header>
          <Toolbar 
            appendLeft={
              <Button.Group>
                <Button type="primary" icon="plus" onClick={this.onAdd}>新增</Button>
                <Button disabled={!rows.length} onClick={this.onDelete(rows)} icon="delete">删除</Button>
              </Button.Group>
            }
            pullDown={
              <SearchBar type="grid" {...searchBarProps} />
            }
          >
            <SearchBar {...searchBarProps} />
          </Toolbar>
        </Header>
        <Content>
        <DataTable {...dataTableProps} />
        </Content>
        <Footer>
          <Pagination {...dataTableProps} />
        </Footer>
        <ModalForm {...modalFormProps} />
      </Layout>
    )
  }
}