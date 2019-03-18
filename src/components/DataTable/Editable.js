import React from 'react';
import { Form } from 'antd';
import omit from 'object.omit';
import DataTable, { Oper } from './DataTable';

const EditableContext = React.createContext();

const Editable = Form.create()(({ form, ...props }) => (
  <EditableContext.Provider value={form}>
    <DataTable {...props} />
  </EditableContext.Provider>
));

/**
 * 重新包装的Oper为了传递form到子组件
 * 例如
 *  <EditableOper>
      {
        form => <a onClick={e => onSave(form)}>保存</a>
      }
    </EditableOper>
 */
const EditableOper = props => (
  <EditableContext.Consumer>
    {form => <Oper>{props.children(form)}</Oper>}
  </EditableContext.Consumer>
);

/**
 * 可编辑元件
 * 通过返回一个组件来改变当前表格Cell的展现方式
 * @param text 当前cell里的文本内容
 * @param record [Object] 包含当前cell的一行数据
 * @param field [Object] columns里的这一列
 * @param field.tableItem.editing [Function] 使用函数可以支持满足条件的指定单元格应用类型
 */
class EditableCell extends React.Component {
  componentDidMount() {
    // 重置表单项，否则会带入值到下一行
    const { record, field } = this.props;
    if (record && record[field.name]) {
      this.form.setFieldsValue({
        [field.name]: record[field.name]
      });
    }
  }

  render() {
    const { record, text, field } = this.props;
    const { tableItem } = field;
    const { type } = tableItem;

    return (
      <EditableContext.Consumer>
        {form => {
          if (!form) {
            console.warn('Please use Editable instead of DataTable');
            return text;
          }
          if (!this.form) this.form = form;
          let formProps = {
            form,
            name: field.name,
            title: field.title,
            record,
            ...tableItem
          };
          if (field.dict) {
            formProps.dict = field.dict;
          }
          formProps = omit(formProps, ['editing', 'render']);
          return (
            <Form.Item help={false}>
              {require(`../Form/model/${type.toLowerCase()}`).default(
                formProps
              )}
            </Form.Item>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

export { Editable, EditableCell, EditableOper };
