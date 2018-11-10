import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, message } from 'antd';
import Form from './Form';
import Icon from 'components/Icon';
import LazyLoad from 'components/LazyLoad';
import isEqual from 'react-fast-compare';
import notdata from 'assets/images/nodata.svg';
import './style/index.less';

// 预置columns
const columns = [
  {
    title: '标题',
    name: 'title',
    formItem: {
      rules: [
        {
          required: true,
          message: '请输入标题'
        },
        {
          max: 300,
          message: '标题最多能输入300个字符'
        },
        {
          pattern: /^[\w\u4E00-\u9FA5]+$/,
          message: '标题只能输入英文字母、数字、汉字'
        }
      ]
    }
  },
  {
    title: '链接',
    name: 'link',
    formItem: {
      rules: [
        {
          required: true,
          message: '请输入链接'
        },
        {
          max: 300,
          message: '链接最多能输入300个字符'
        }
      ]
    }
  },
  {
    title: '图片',
    name: 'file',
    formItem: {
      type: 'upload',
      listType: 'picture-card',
      max: 1,
      fileTypes: ['.png', '.jpg', '.gif'],
      rules: [
        {
          required: true,
          message: '请上传图片'
        }
      ],
      renderUpload: (a, b, isDisabled) =>
        isDisabled ? null : (
          <div>
            <Icon type="plus" />
            <div className="ant-upload-text">上传</div>
          </div>
        )
    }
  }
];

class BannerMng extends Component {
  static propTypes = {
    dataSource: PropTypes.array,
    onChange: PropTypes.func,
    fileNum: PropTypes.number,
    fileSize: PropTypes.number,
    fileType: PropTypes.array,
    formCols: PropTypes.array,
    title: PropTypes.node
  };

  static defaultProps = {
    formCols: columns,
    title: '幻灯片'
  };

  constructor(props) {
    const { formCols } = props;
    super(props);

    let imageKey = null;
    formCols.forEach(item => {
      if (item.formItem && item.formItem.type === 'upload') {
        imageKey = item.name;
      }
    });
    if (!imageKey)
      console.error("BannerMng required a column of type 'upload'");

    this.state = {
      isEdit: false,
      isAdd: false,
      record: null,
      imageKey,
      dataSource: props.dataSource || []
    };
  }

  componentWillReceiveProps(nextProps) {
    const { dataSource } = nextProps;
    if (!isEqual(this.props.dataSource, dataSource)) {
      this.setState({
        dataSource
      });
    }
  }

  onEditBanner = (item, editKey) => {
    this.setState({
      isEdit: editKey,
      isAdd: false,
      record: item
    });
  };

  onAddBanner = () => {
    if (this.props.fileNum && this.props.fileNum > 0) {
      if (this.props.dataSource.length >= this.props.fileNum) {
        message.error(`最多可以添加${this.props.fileNum}张图片`);
        return;
      }
    }

    this.setState({
      isAdd: true,
      isEdit: false,
      record: null
    });
  };

  onCancel = () => {
    this.setState({
      isAdd: false,
      isEdit: false,
      record: null
    });
  };

  onChange = (type, item, i) => {
    let { dataSource, isEdit } = this.state;
    const newState = {};
    switch (type) {
      case 'up':
        dataSource.splice(i - 1, 0, dataSource.splice(i, 1)[0]);
        break;
      case 'down':
        dataSource.splice(i + 1, 0, dataSource.splice(i, 1)[0]);
        break;
      case 'add':
        newState.isAdd = false;
        dataSource.push(item);
        break;
      case 'edit':
        let tempIndex = -1;
        let temp = dataSource.filter((data, index) => {
          if ('edit_' + index === isEdit) {
            tempIndex = index;
            return false;
          }
          return true;
        });
        temp.splice(tempIndex, 0, item);
        dataSource = temp;
        newState.isEdit = false;
        break;
      case 'delete':
        dataSource.splice(i, 1);
        break;
      default:
        break;
    }
    this.setState({
      dataSource,
      ...newState
    });

    this.props.onChange && this.props.onChange(dataSource);
  };

  render() {
    const { formCols, title } = this.props;
    let { dataSource, record, isEdit, isAdd, imageKey } = this.state;

    return (
      <div className="banner-view-mng">
        <div className="banner-title clearfix">
          <div className="title">
            <Icon type="picture" /> {isEdit ? '修改' : isAdd ? '新增' : ''}
            {title}
          </div>
          <div className="btns">
            {!isAdd && !isEdit ? (
              <Button icon="plus" type="primary" onClick={this.onAddBanner}>
                新增
              </Button>
            ) : (
              <Button icon="rollback" onClick={this.onCancel}>
                返回
              </Button>
            )}
          </div>
        </div>
        {isEdit || isAdd ? (
          <Form
            imageKey={imageKey}
            columns={formCols}
            record={record}
            onCancel={this.onCancel}
            onSubmit={values => this.onChange(isEdit ? 'edit' : 'add', values)}
          />
        ) : (
          <div className="banner-content clearfix">
            {!dataSource.length ? (
              <div className="notdata">
                <img src={notdata} alt="" />
                <div>~~没有内容~~</div>
              </div>
            ) : null}
            {dataSource.map((item, i) => (
              <div className="row" key={i}>
                <div className="preview">
                  <LazyLoad dataSrc={item[imageKey]} />
                </div>
                <ul className="oper">
                  <li className="top">
                    <Button
                      icon="caret-up"
                      title="上移"
                      disabled={i === 0}
                      onClick={e => this.onChange('up', item, i)}
                    />
                  </li>
                  <li className="bottom">
                    <Button
                      icon="caret-down"
                      title="下移"
                      disabled={i === dataSource.length - 1}
                      onClick={e => this.onChange('down', item, i)}
                    />
                  </li>
                  <li className="edit">
                    <Button
                      icon="edit"
                      title="修改"
                      onClick={e => this.onEditBanner(item, 'edit_' + i)}
                    />
                  </li>
                  <li className="remove">
                    <Button
                      icon="close"
                      title="删除"
                      onClick={e => this.onChange('delete', item, i)}
                    />
                  </li>
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default BannerMng;
