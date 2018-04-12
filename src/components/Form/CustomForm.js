/**
 * 自定义表单元件
 */
export default ({form, render, record, ...otherProps}) => {
  return render(record, form, otherProps);
};