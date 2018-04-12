import React from 'react';
import { connect } from 'dva';
import { Layout, Button, Icon, Upload } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Toolbar from 'components/Toolbar';
import SearchBar from 'components/SearchBar';
import DataTable, {Tip} from 'components/DataTable';
import { ModalForm } from 'components/Modal';
import createColumns from './columns';
import $$ from 'cmn-utils';
import debounce from 'lodash/debounce';
import './index.less';
const { Content, Header, Footer } = Layout;
const Pagination = DataTable.Pagination

@connect(({ work, loading }) => ({
  work,
  loading: loading.models.work,
}))
export default class Work extends BaseComponent {
  state = {
    record: null,
    visible: false,
    rows: [],
    persons: [],
    treeData: [],
  }

  constructor(props) {
    super(props);
    this.fetchUser = debounce(this.fetchUser, 800);
    this.lastFetchId = 0;
    this.fetchGroup();
  }

  componentDidMount() {
    const {dispatch, work} = this.props;
    const {pageData} = work;

    dispatch({
      type: 'work/@request',
      payload: {
        valueField: 'pageData',
        url: '/site_operations_pc/work/getList',
        pageInfo: pageData.filter({planType: '1', planStatuses: ['1']}).startPage(1, 10),
      }
    });
  }

  onPublish = (record) => () => {
    const {pageData} = this.props.work;

    this.props.dispatch({
      type: 'work/@request',
      payload: [{
        notice: true,
        url: '/site_operations_pc/work/issued',
        data: [record.id]
      }, {
        valueField: 'pageData',
        url: '/site_operations_pc/work/getList',
        pageInfo: pageData,
      }]
    });
  }

  handleDelete = (records) => {
    const {pageData} = this.props.work;

    const todoRecords = records.filter(item => item.planStatus !== '2');
    if (!todoRecords.length) return;

    this.props.dispatch({
      type: 'work/@request',
      payload: [{
        notice: true,
        url: '/site_operations_pc/work/bathDelete',
        data: todoRecords.map(item => item.id)
      }, {
        valueField: 'pageData',
        url: '/site_operations_pc/work/getList',
        pageInfo: pageData,
      }]
    });
  }

  fetchUser = (value) => {
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ data: [], fetching: true });

      
    this.props.dispatch({
      type: 'work/@request',
      payload: {
        method: 'postform',
        url: '/site_operations_pc/work/userFuzzySearch',
        data: {name: value},
        success: (resp) => {
          if (fetchId !== this.lastFetchId) {
            return;
          }
          const persons = resp.data.map(user => ({
            codeName: <Tip>{`${ user.name}/${user.deptName}`}</Tip>,
            // codeName: user.name,
            code: user.jid,
          }));
          this.setState({ persons, fetching: false });
        }
      },
    })
  }

  handleChange = (value) => {
    this.setState({
      value,
      persons: [],
      fetching: false,
    });
  }

  fetchGroup = (groupId = 'root', treeNode) => {
    return $$.post('/site_operations_pc/dept/getIsphereDeptTree/' + groupId).then(resp => {
      if (treeNode) {
        if (treeNode.props.children) {
          return;
        }
        treeNode.props.dataRef.children = resp;
        this.setState({
          treeData: [...this.state.treeData],
        });
      } else {
        this.state.treeData = resp;
      }
      this.setState({
        treeData: [...this.state.treeData],
      });
    })
  }

  onLoadData = (treeNode) => {
    return this.fetchGroup(treeNode.props.eventKey, treeNode);
  }

  render() {
    const { work, loading, dispatch } = this.props;
    const { pageData } = work;
    const { rows, record, visible, persons, fetching, treeData } = this.state;
    const columns = createColumns(this, persons, fetching, record, treeData);

    const searchBarProps = {
      columns,
      onSearch: (values) => {
        if (values.workEmployeeList) {
          values.employeeName = values.workEmployeeList;
        }
        dispatch({
          type: 'work/@request',
          payload: {
            valueField: 'pageData',
            url: '/site_operations_pc/work/getList',
            pageInfo: pageData.filter(values, true).jumpPage(1, 10),
          }
        });
      }
    };

    const dataTableProps = {
      loading,
      columns,
      rowKey: 'id',
      dataItems: pageData,
      selectType: 'checkbox',
      showNum: true,
      isScroll: true,
      onChange: ({pageNum, pageSize}) => {
        dispatch({
          type: 'work/@request',
          payload: {
            valueField: 'pageData',
            url: '/site_operations_pc/work/getList',
            pageInfo: pageData.jumpPage(pageNum, pageSize),
          }
        });
      },
      rowClassName: (record, index) => {
      	return record.importType=='0'?'importFail':'';
      },
      onSelect: (keys, rows) => this.setState({rows}),
    }

    const modalFormProps = {
      loading,
      record,
      visible,
      columns,
      onCancel: () => {
        this.setState({
          record: null,
          visible: false
        })
      },
      onSubmit: (values) => {
        values.planBeginTime = values.planBeginTime.format('YYYY-MM-DD HH:mm:ss');
        values.planEndTime = values.planEndTime.format('YYYY-MM-DD HH:mm:ss');
        values.workEmployee = values.workEmployeeList.map(item => item.key);
        delete values.workEmployeeList;
        dispatch({
          type: 'work/@request',
          payload: [{
            notice: true,
            url: '/site_operations_pc/work/saveEdit',
            data: values,
            success: () => {
              this.setState({
                record: null,
                visible: false
              })
            }
          }, {
            valueField: 'pageData',
            url: '/site_operations_pc/work/getList',
            pageInfo: pageData,
          }],
        });
      }
    };

    const uploadProps = {
      name: 'file',
      action: '/site_operations_pc/work/importExcel',
      showUploadList: false,
      headers: {
        userId: $$.getStore('userId'),
      },
      onChange: (info) => {
        if (info.file.status !== 'uploading') {
        }
        if (info.file.status === 'done') {
          const {status} = info.file.response;
          if (status) {
            this.notice.success('上传成功');
            dispatch({
              type: 'work/@request',
              payload: {
                valueField: 'pageData',
                url: '/site_operations_pc/work/getList',
                pageInfo: pageData.jumpPage(1),
              }
            });
          } else {
            this.notice.error('上传失败');
          }
        } else if (info.file.status === 'error') {
        }
      },
    };

    return (
      <Layout className="full-layout work-page">
        <Header>
          <Toolbar 
            appendLeft={
              <Button.Group>
                <Upload {...uploadProps}>
                  <Button type="primary"><Icon type="right-square-o" />导入</Button>
                </Upload>
                <Button disabled={!rows.length} onClick={this.onDelete(rows.filter(item => item.planStatus !== '2'))}><Icon type="delete" style={{  color: '#ff717a' }} />批量删除</Button>
              </Button.Group>
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