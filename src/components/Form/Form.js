import React from 'react';
import PropTypes from 'prop-types';
import { CheckOutlined, ReloadOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Row, Col, Button, Divider } from 'antd';
import cx from 'classnames';
import objectAssign from 'object-assign';
import $$ from 'cmn-utils';
import omit from 'object.omit';
import Password from './model/password';
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
 * 表单组件
 */
class FormComp extends React.Component {
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
     * 表单类型 inline(行内)，grid(栅格)
     */
    type: PropTypes.string,
    /**
     * 搜索条件分组，设置这个属性后，会在column.js中过滤有相同group值的搜索项
     */
    group: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * 如何处理表单里带弹出框的项，比如下拉框，下拉树，日期选择等
     * 设置为true会自动依附到form上，或用function自已指定
     * 用法见antd带弹窗组件的getPopupContainer属性http://ant-design.gitee.io/components/select-cn/
     * appendTo={triggerNode => triggerNode.parentNode}
     */
    appendTo: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    /**
     * 同antd中Grid组件中的Row配置
     */
    rows: PropTypes.object,
    /**
     * 同antd中Grid组件中的Col配置
     */
    cols: PropTypes.object,
    /**
     * 额外表单项
     */
    children: PropTypes.node,
    /**
     * antd的form对像
     */
    form: PropTypes.object,
    /**
     * 点击查询按钮 onSubmit(values) values 提交数据
     */
    onSubmit: PropTypes.func,

    /**
     * 是否是预览视图，所有表单项将展示为文本模式
     */
    preview: PropTypes.bool,

    /** antd formItemLayout */
    formItemLayout: PropTypes.object,
    layout: PropTypes.object, // 同formItemLayout

    /**
     * 是否是提交中状态
     */
    loading: PropTypes.bool,

    /**
     * 是否显示底部按钮，或传入自定义的底部按钮
     */
    footer: PropTypes.oneOfType([PropTypes.bool, PropTypes.node])
  };

  static defaultProps = {
    prefixCls: 'antui-form',
    type: 'grid',
    loading: false,
    formItemLayout: {
      labelCol: { span: 6 },
      wrapperCol: { span: 17 }
    }
  };

  // 当type为grid时，指定每行元素个数
  cols = {
    xs: 24,
    md: 24,
    xl: 24
  };

  // 内联元素默认宽
  width = {
    date: 100,
    month: 100,
    'date~': 280,
    datetime: 140,
    select: 100,
    default: 100,
    treeSelect: 110,
    cascade: 110,
    cascader: 110
  };

  // 当type为grid时，指定每两个元素的间隔
  rows = {
    gutter: 8
  };

  onReset = e => {
    this.props.form.resetFields();
  };

  onSubmit = e => {
    e.preventDefault();
    const { form, record, onSubmit } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        onSubmit && onSubmit(values, record);
      }
    });
  };

  render() {
    const {
      className,
      prefixCls,
      type,
      rows,
      cols,
      formItemLayout: _formItemLayout,
      layout,
      appendTo,
      columns,
      record,
      group,
      children,
      form,
      preview,
      loading,
      footer,
      ...otherProps
    } = this.props;

    delete otherProps.onSubmit;

    let classname = cx(prefixCls, className, {
      'form-inline': type === 'inline',
      'form-grid': type === 'grid',
      preview: preview
    });

    const colopts = type === 'grid' ? cols || this.cols : {};
    const rowopts = type === 'grid' ? rows || this.rows : {};

    let ComponentRow = type === 'inline' ? PlainComp : Row;
    let ComponentCol = type === 'inline' ? PlainComp : Col;
    let ComponentItem = Form.Item;

    let formFields = columns.filter(col => col.formItem);
    formFields = group
      ? formFields.filter(col => col.formItem && col.formItem.group === group)
      : formFields;

    let getPopupContainer = null;
    if (appendTo) {
      if ($$.isFunction(appendTo)) getPopupContainer = appendTo;
      else if (appendTo === true)
        getPopupContainer = triggerNode => triggerNode.parentNode;
      else getPopupContainer = _ => appendTo;
    }

    return (
      <Form
        className={classname}
        onSubmit={this.onSubmit}
        {...objectAssign(otherProps, type === 'inline' && { layout: 'inline' })}
      >
        <ComponentRow className="row-item" {...rowopts}>
          {formFields.map((field, i) => {
            // 传入个性化的列大小，改变这个值可以改变每行元素的个数
            let col = { ...colopts };
            if (type === 'grid' && field.formItem.col) {
              col = field.formItem.col;
            } else if (type !== 'grid') {
              col = {};
            }

            let formItemLayout = { ..._formItemLayout, ...layout };
            if (
              type === 'grid' &&
              (field.formItem.formItemLayout || field.formItem.layout)
            ) {
              formItemLayout = {
                ...formItemLayout,
                ...field.formItem.formItemLayout,
                ...field.formItem.layout
              };
            } else if (type !== 'grid') {
              formItemLayout = {};
            }

            const fieldType = field.formItem.type || 'input';

            let formProps = {
              form,
              name: field.name,
              title: field.title,
              record,
              preview,
              ...field.formItem
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

            // 传入子组件前删除无用属性
            formProps = omit(formProps, ['formItemLayout', 'layout', 'col']);

            let FieldComp;
            switch (fieldType) {
              case 'date~': // 日期范围
              case 'datetime': // 日期时间
              case 'date': // 日期
              case 'month': // 月
              case 'time': // 时间
                FieldComp = require(`./model/date`).default(formProps);
                break;
              case 'input': // 输入框
              case 'textarea': // 多行文本
                FieldComp = require(`./model/input`).default(formProps);
                break;
              case 'hidden': // 隐藏域
                return (
                  <span key={`col-${i}`}>
                    {require(`./model/input`).default(formProps)}
                  </span>
                );
              case 'line': // 分隔线
                const lineProps = omit(formProps, 'type');
                return (
                  <Divider key={`col-${i}`} {...lineProps}>
                    {formProps.title}
                  </Divider>
                );
              case 'password': // 密码
                return (
                  <Password
                    key={`col-${i}`}
                    formItemLayout={formItemLayout}
                    col={col}
                    {...formProps}
                  />
                );
              default:
                // 通用
                FieldComp = require(`./model/${fieldType.toLowerCase()}`).default(
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
          {footer === undefined ? (
            <ComponentCol className="form-btns col-item" {...colopts}>
              <Button
                title="提交"
                type="primary"
                htmlType="submit"
                icon={<CheckOutlined />}
                loading={loading}
              >
                提交
              </Button>
              <Button title="重置" onClick={e => this.onReset()} icon={<ReloadOutlined />}>
                重置
              </Button>
            </ComponentCol>
          ) : (
            footer
          )}
        </ComponentRow>
      </Form>
    );
  }
}

export const Item = Form.Item;

export default createForm()(FormComp);
