import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Button } from 'antd';
import cx from 'classnames';
import objectAssign from 'object-assign';
import InputForm from './InputForm';
import SelectForm from './SelectForm';
import DateForm from './DateForm';
import CascadeForm from './CascadeForm';
import TreeSelectForm from './TreeSelectForm';
import CustomForm from './CustomForm';
import PasswordForm from './PasswordForm';
import InputNumber from './InputNumberForm';
import TransferForm from './TransferForm';
import EditorForm from './EditorForm';
import TransferTreeForm from './TransferTreeForm';
import TableForm from './TableForm';
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
    monthDate: 100,
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
      'form-grid': type === 'grid'
    });

    let colopts = type === 'grid' ? objectAssign(this.cols, cols) : {};
    const rowopts = type === 'grid' ? objectAssign(this.rows, rows) : {};

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
            let { placeholder, width, ...otherField } = objectAssign(
              {
                name: field.name,
                title: field.title,
                placeholder: field.formItem.placeholder || field.title,
                record,
                preview
              },
              field.formItem
            );

            // 传入个性化的列大小，改变这个值可以改变每行元素的个数
            let col = { ...colopts };
            if (type === 'grid' && field.formItem.col) {
              col = field.formItem.col;
            } else if (type !== 'grid') {
              col = {};
            }

            let formItemLayout = { ..._formItemLayout };
            if (type === 'grid' && field.formItem.formItemLayout) {
              formItemLayout = { ...formItemLayout, ...field.formItem.formItemLayout };
            } else if (type !== 'grid') {
              formItemLayout = {};
            }

            switch (field.formItem.type) {
              case 'date~':
              case 'datetime':
              case 'date':
              case 'monthDate':
              case 'time':
                const dateProps = {
                  form: form,
                  type: field.formItem.type,
                  style:
                    type === 'inline'
                      ? { width: width || this.width[field.formItem.type] }
                      : {},
                  format: field.formItem.format,
                  ...otherField
                };
                if (field.formItem.placeholder) {
                  dateProps.placeholder = field.formItem.placeholder;
                }
                if (getPopupContainer) {
                  dateProps.getCalendarContainer = getPopupContainer;
                }
                return (
                  <ComponentCol key={`col-${i}`} className="col-item" {...col}>
                    <ComponentItem
                      {...formItemLayout}
                      label={field.title}
                      className="col-item-content"
                    >
                      {DateForm(dateProps)}
                    </ComponentItem>
                  </ComponentCol>
                );
              case 'cascade':
              case 'cascader':
                const cascadeProps = {
                  form: form,
                  allowClear: true,
                  style:
                    type === 'inline'
                      ? { width: width || this.width[field.formItem.type] }
                      : {},
                  placeholder: `请选择${placeholder}`,
                  ...otherField
                };
                if (getPopupContainer) {
                  cascadeProps.getPopupContainer = getPopupContainer;
                }
                return (
                  <ComponentCol key={`col-${i}`} className="col-item" {...col}>
                    <ComponentItem
                      {...formItemLayout}
                      label={field.title}
                      className="col-item-content"
                    >
                      {CascadeForm(cascadeProps)}
                    </ComponentItem>
                  </ComponentCol>
                );
              case 'select':
                const selectProps = {
                  form: form,
                  dict: field.dict,
                  allowClear: true,
                  style:
                    type === 'inline'
                      ? { width: width || this.width[field.formItem.type] }
                      : {},
                  placeholder: `请选择${placeholder}`,
                  ...otherField
                };
                if (getPopupContainer) {
                  selectProps.getPopupContainer = getPopupContainer;
                }
                return (
                  <ComponentCol key={`col-${i}`} className="col-item" {...col}>
                    <ComponentItem
                      {...formItemLayout}
                      label={field.title}
                      className="col-item-content"
                    >
                      {SelectForm(selectProps)}
                    </ComponentItem>
                  </ComponentCol>
                );
              case 'treeSelect':
                const treeSelectProps = {
                  form: form,
                  allowClear: true,
                  style:
                    type === 'inline'
                      ? { width: width || this.width[field.formItem.type] }
                      : {},
                  placeholder: `请选择${placeholder}`,
                  ...otherField
                };
                if (getPopupContainer) {
                  treeSelectProps.getPopupContainer = getPopupContainer;
                }
                return (
                  <ComponentCol key={`col-${i}`} className="col-item" {...col}>
                    <ComponentItem
                      {...formItemLayout}
                      label={field.title}
                      className="col-item-content"
                    >
                      {TreeSelectForm(treeSelectProps)}
                    </ComponentItem>
                  </ComponentCol>
                );
              case 'transfer':
                return (
                  <ComponentCol key={`col-${i}`} className="col-item" {...col}>
                    <ComponentItem
                      {...formItemLayout}
                      label={field.title}
                      className="col-item-content"
                    >
                      {TransferForm({
                        form: form,
                        style:
                          type === 'inline'
                            ? {
                                width: width || this.width[field.formItem.type]
                              }
                            : {},
                        ...otherField
                      })}
                    </ComponentItem>
                  </ComponentCol>
                );
              case 'transferTree':
                return (
                  <ComponentCol key={`col-${i}`} className="col-item" {...col}>
                    <ComponentItem
                      {...formItemLayout}
                      label={field.title}
                      className="col-item-content"
                    >
                      {TransferTreeForm({
                        form: form,
                        style:
                          type === 'inline'
                            ? {
                                width: width || this.width[field.formItem.type]
                              }
                            : {},
                        ...otherField
                      })}
                    </ComponentItem>
                  </ComponentCol>
                );
              case 'table':
                return (
                  <ComponentCol key={`col-${i}`} className="col-item" {...col}>
                    <ComponentItem
                      {...formItemLayout}
                      label={field.title}
                      className="col-item-content"
                    >
                      {TableForm({
                        form: form,
                        style:
                          type === 'inline'
                            ? {
                                width: width || this.width[field.formItem.type]
                              }
                            : {},
                        ...otherField
                      })}
                    </ComponentItem>
                  </ComponentCol>
                );
              case 'editor':
                return (
                  <ComponentCol key={`col-${i}`} className="col-item" {...col}>
                    <ComponentItem
                      {...formItemLayout}
                      label={field.title}
                      className="col-item-content"
                    >
                      {EditorForm({
                        form: form,
                        style:
                          type === 'inline'
                            ? {
                                width: width || this.width[field.formItem.type]
                              }
                            : {},
                        ...otherField
                      })}
                    </ComponentItem>
                  </ComponentCol>
                );
              case 'custom':
                return (
                  <ComponentCol key={`col-${i}`} className="col-item" {...col}>
                    <ComponentItem
                      {...formItemLayout}
                      label={field.title}
                      className="col-item-content"
                    >
                      {CustomForm({
                        form: form,
                        render: field.formItem.render,
                        style:
                          type === 'inline'
                            ? {
                                width: width || this.width[field.formItem.type]
                              }
                            : {},
                        ...otherField
                      })}
                    </ComponentItem>
                  </ComponentCol>
                );
              case 'hidden':
                return (
                  <InputForm
                    key={`col-${i}`}
                    form={form}
                    type="hidden"
                    {...otherField}
                  />
                );
              case 'password':
                return (
                  <PasswordForm
                    key={`col-${i}`}
                    form={form}
                    type={type}
                    style={
                      type === 'inline'
                        ? { width: width || this.width.default }
                        : {}
                    }
                    placeholder={`请填写${placeholder}`}
                    repeat={field.formItem.repeat}
                    formItemLayout={formItemLayout}
                    col={col}
                    {...otherField}
                  />
                );
              case 'number':
                return (
                  <ComponentCol key={`col-${i}`} className="col-item" {...col}>
                    <ComponentItem
                      {...formItemLayout}
                      label={field.title}
                      className="col-item-content"
                    >
                      {InputNumber({
                        form,
                        style:
                          type === 'inline'
                            ? { width: width || this.width.default }
                            : {},
                        placeholder: `请输入${placeholder}`,
                        maxLength: field.formItem.maxLength || '100',
                        ...otherField
                      })}
                    </ComponentItem>
                  </ComponentCol>
                );
              default:
                return (
                  <ComponentCol key={`col-${i}`} className="col-item" {...col}>
                    <ComponentItem
                      {...formItemLayout}
                      label={field.title}
                      className="col-item-content"
                    >
                      {InputForm({
                        form,
                        type: field.formItem.type,
                        style:
                          type === 'inline'
                            ? { width: width || this.width.default }
                            : {},
                        placeholder: `请输入${placeholder}`,
                        maxLength: field.formItem.maxLength || '100',
                        autoComplete: 'off',
                        ...otherField
                      })}
                    </ComponentItem>
                  </ComponentCol>
                );
            }
          })}
          {children}
          {footer === undefined ? (
            <ComponentCol className="form-btns col-item" {...colopts}>
              <Button
                title="提交"
                type="primary"
                htmlType="submit"
                icon="check"
                loading={loading}
              >
                提交
              </Button>
              <Button title="重置" onClick={e => this.onReset()} icon="reload">
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

export const Item = Form.item;

export default createForm()(FormComp);
