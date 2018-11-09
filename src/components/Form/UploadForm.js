import React from 'react';
import { Upload, Button } from 'antd';
import $$ from 'cmn-utils';
/**
 * Upload元件, 可能需要自已处理反回值，如果后台需要FormData
 * const formData = new FormData();
   fileList.forEach((file) => {
     formData.append('files[]', file);
   });
 */
export default ({
  form,
  name,
  formFieldOptions = {},
  record,
  initialValue,
  normalize,
  rules,
  onChange,
  type,
  preview,
  renderUpload,
  btnIcon = 'upload',
  max,
  ...otherProps
}) => {
  const { getFieldDecorator } = form;

  let initval = initialValue;

  if (record) {
    initval = record[name];
  }

  // 如果存在初始值
  if (initval !== null && typeof initval !== 'undefined') {
    if ($$.isFunction(normalize)) {
      formFieldOptions.initialValue = normalize(initval);
    } else {
      formFieldOptions.initialValue = $$.isArray(initval)
        ? initval.map((item, index) => ({
            uid: 'fs_' + index,
            thumbUrl: item
          }))
        : [
            {
              uid: 'fs_0',
              thumbUrl: record[name]
            }
          ];
    }
  }

  if (preview) {
    return <div style={otherProps.style}>{initval || ''}</div>;
  }

  // 如果有rules
  if (rules && rules.length) {
    formFieldOptions.rules = rules;
  }

  // 如果需要onChange
  if (typeof onChange === 'function') {
    formFieldOptions.onChange = args => onChange(form, args); // form, args
  }

  const value = form.getFieldValue(name);

  return getFieldDecorator(name, {
    valuePropName: 'fileList',
    getValueFromEvent: normFile,
    ...formFieldOptions
  })(
    <Upload listType="picture" beforeUpload={file => false} {...otherProps}>
      {renderUpload ? (
        renderUpload(form, record, isDisabled(max, value))
      ) : (
        <Button icon={btnIcon} disabled={isDisabled(max, value)}>
          点击上传
        </Button>
      )}
    </Upload>
  );
};

// 如果设置max，控制按钮禁用状态
const isDisabled = (max, value) => {
  if (!max) return false;
  if (!value) return false;
  if (value && value.length < max) {
    return false;
  }
  return true;
};

const normFile = e => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};
