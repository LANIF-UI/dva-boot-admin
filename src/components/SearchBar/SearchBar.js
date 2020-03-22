import React from 'react';
import PropTypes from 'prop-types';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Row, Col, Button, message } from 'antd';
import cx from 'classnames';
import $$ from 'cmn-utils';
import './style/index.less';
const createForm = Form.create;

const PlainComp = ({ className, children }) => (
  <div className={className}>{children}</div>
);
PlainComp.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};
/**
 * 搜索条
 */
class SearchBar extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    /**
     * 详见帮助文档 column.js 用法
     */
    columns: PropTypes.array.isRequired,
    /**
     * 使用record的数据对表单进行赋值 {key:value, key1: value1}, 时间类型初始值需转成moment类型
     */
    record: PropTypes.object,
    /**
     * 搜索条类型 inline(行内)，grid(栅格)
     */
    type: PropTypes.string,
    /**
     * 搜索条件分组，设置这个属性后，会在column.js中过滤有相同group值的搜索项
     */
    group: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * 同antd中Grid组件中的Row配置
     */
    rows: PropTypes.object,
    /**
     * 同antd中Grid组件中的Col配置
     */
    cols: PropTypes.object,
    /**
     * 额外搜索项
     */
    children: PropTypes.node,
    /**
     * 如何处理表单里带弹出框的项，比如下拉框，下拉树，日期选择等
     * 设置为true会自动依附到form上，或用function自已指定
     * 用法见antd带弹窗组件的getPopupContainer属性http://ant-design.gitee.io/components/select-cn/
     * appendTo={triggerNode => triggerNode.parentNode}
     */
    appendTo: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),

    form: PropTypes.object,

    /**
     * 点击查询按钮 onSearch(values, isReset) values 查询数据 isReset 是否是重置
     */
    onSearch: PropTypes.func
  };

  static defaultProps = {
    prefixCls: 'antui-searchbar',
    type: 'inline'
  };

  // 当type为grid时，指定每行元素个数
  cols = {
    xs: 8,
    md: 6,
    xl: 4
  };

  // 内联元素默认宽
  width = {
    date: 100,
    month: 100,
    'date~': 280,
    datetime: 140,
    select: 100,
    default: 110,
    treeSelect: 110,
    cascade: 110,
    cascader: 110
  };

  // 当type为grid时，指定每两个元素的间隔
  rows = {
    gutter: 8
  };

  resetForm(e) {
    this.props.form.resetFields();
    this.searchForm(true);
  }

  searchForm(isReset) {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        let errs = [];
        Object.keys(errors).forEach(fieldName => {
          errs = errors[fieldName].errors || [];
        });
        if (errs && errs.length) message.error(errs[0].message);
        return;
      }

      this.props.onSearch && this.props.onSearch(values, isReset);
    });
  }

  render() {
    const {
      className,
      prefixCls,
      type,
      rows,
      cols,
      columns,
      group,
      children,
      form,
      appendTo,
      record,
      ...otherProps
    } = this.props;

    const colopts = type === 'grid' ? cols || this.cols : {};
    const rowopts = type === 'grid' ? rows || this.rows : {};

    let ComponentRow = type === 'inline' ? PlainComp : Row;
    let ComponentCol = type === 'inline' ? PlainComp : Col;
    let ComponentItem = type === 'inline' ? PlainComp : Form.Item;
    const formItemLayout =
      type === 'grid'
        ? {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 }
          }
        : {};

    let ComponentBtnGroup = type === 'inline' ? Button.Group : PlainComp;

    let searchFields = columns.filter(col => col.searchItem);
    searchFields = group
      ? searchFields.filter(
          col => col.searchItem && col.searchItem.group === group
        )
      : searchFields;

    if (!searchFields.length) return null;

    delete otherProps.onSearch;

    let getPopupContainer = null;
    if (appendTo) {
      if ($$.isFunction(appendTo)) getPopupContainer = appendTo;
      else if (appendTo === true)
        getPopupContainer = triggerNode => triggerNode.parentNode;
      else getPopupContainer = _ => appendTo;
    }

    return (
      <div className={cx(prefixCls, className)} {...otherProps}>
        <Form
          className={cx({
            'form-inline': type === 'inline',
            'form-grid': type === 'grid'
          })}
        >
          <ComponentRow className="row-item" {...rowopts}>
            {searchFields.map((field, i) => {
              let col = { ...colopts };
              if (type === 'grid' && field.searchItem.col) {
                col = field.searchItem.col;
              } else if (type !== 'grid') {
                col = {};
              }

              const fieldType = field.searchItem.type || 'input';

              const formProps = {
                form,
                name: field.name,
                title: field.title,
                record,
                ...field.searchItem
              };

              if (type === 'inline') {
                formProps.style = {
                  width: formProps.width || this.width[fieldType]
                };
              }

              if (getPopupContainer) {
                formProps.getPopupContainer = getPopupContainer;
              }

              if (field.dict) {
                formProps.dict = field.dict;
              }

              let FieldComp;
              switch (fieldType) {
                case 'date~': // 日期范围
                case 'datetime': // 日期时间
                case 'date': // 日期
                case 'month': // 月
                case 'time': // 时间
                  FieldComp = require(`../Form/model/date`).default(formProps);
                  break;
                case 'input': // 输入框
                case 'textarea': // 多行文本
                  formProps.formFieldOptions = {
                    rules: [
                      {
                        pattern: /^[^'%&<>=?*!]*$/,
                        message: '查询条件中不能包含特殊字符'
                      }
                    ]
                  };
                  formProps.maxLength = field.searchItem.maxLength || 100;
                  formProps.autoComplete = 'off';
                  FieldComp = require(`../Form/model/input`).default(formProps);
                  break;
                case 'hidden': // 隐藏域
                  return (
                    <span key={`col-${i}`}>
                      {require(`../Form/model/input`).default(formProps)}
                    </span>
                  );
                case 'select':
                  formProps.optionFilterProp = 'children';
                // eslint-disable-next-line no-fallthrough
                case 'treeSelect':
                case 'cascade':
                  formProps.allowClear = true;
                  formProps.showSearch = true;
                // eslint-disable-next-line no-fallthrough
                default:
                  // 通用
                  FieldComp = require(`../Form/model/${fieldType.toLowerCase()}`).default(
                    formProps
                  );
              }

              return (
                <ComponentCol key={`col-${i}`} className="col-item" {...col}>
                  <ComponentItem
                    {...formItemLayout}
                    label={field.title}
                    className="col-item-content"
                  >
                    {FieldComp}
                  </ComponentItem>
                </ComponentCol>
              );
            })}
            {children}
          </ComponentRow>
          <ComponentBtnGroup className="search-btns">
            <Button
              title="查询"
              type={type === 'grid' ? 'primary' : 'default'}
              onClick={e => this.searchForm()}
              htmlType="submit"
              icon={<SearchOutlined />}
            >
              查询
            </Button>
            <Button title="重置" onClick={e => this.resetForm()} icon={<ReloadOutlined />}>
              重置
            </Button>
          </ComponentBtnGroup>
        </Form>
      </div>
    );
  }
}

export default createForm()(SearchBar);
