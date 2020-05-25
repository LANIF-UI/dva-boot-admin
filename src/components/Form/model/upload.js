import React from 'react';
import Icon from 'components/Icon';
import { Button } from 'antd';
import Upload from '../../Upload';
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
  btnIcon = 'UploadOutlined',
  max,
  maxFileSize, // 最大文件大小
  fileTypes, // 允许文件类型
  action, // 后台地址
  fileName, // antd upload 的name属性,因为name被formItem使用,上传到后台的文件名
  getPopupContainer,
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
      formFieldOptions.initialValue = initval;
    }
  }

  if (preview) {
    return <div style={otherProps.style}>{initval || ''}</div>;
  }

  // 如果有rules
  if (rules && rules.length) {
    formFieldOptions.rules = rules;
  }

  if (maxFileSize || fileTypes) {
    formFieldOptions.rules = [
      {
        validator: (rule, value, callback) => {
          validatorFileSize(maxFileSize, value, callback);
          validatorFileTypes(fileTypes, value, callback);
          callback();
        }
      },
      ...(formFieldOptions.rules || [])
    ];
  }

  // 如果需要onChange
  if (typeof onChange === 'function') {
    formFieldOptions.onChange = args => onChange(form, args); // form, args
  }

  let uploadProps = {
    beforeUpload: file => false,
    ...otherProps
  };

  // 真接上传到后台
  if (action) {
    uploadProps = otherProps;
    uploadProps.action = action;
    uploadProps.name = fileName || 'file';
  }

  return getFieldDecorator(name, {
    valuePropName: 'fileList',
    getValueFromEvent: normFile,
    ...formFieldOptions
  })(
    <Upload {...uploadProps}>
      {renderUpload ? (
        renderUpload(form, record, isDisabled(max, form.getFieldValue(name)))
      ) : (
        <Button
          icon={<Icon type={btnIcon} antd/>}
          disabled={isDisabled(max, form.getFieldValue(name))}
        >
          点击上传
        </Button>
      )}
    </Upload>
  );
};

const validatorFileSize = (maxFileSize, value, callback) => {
  if (value && value.some(item => item.size > maxFileSize * 1024)) {
    callback(new Error(`请上传文件大小在${maxFileSize}K以内的图片`));
    return;
  }
};

const validatorFileTypes = (fileTypes, value, callback) => {
  if (value && $$.isArray(fileTypes) && fileTypes.length > 0) {
    if (
      value.some(
        item =>
          item.name &&
          !fileTypes.some(
            type => item.name.toLowerCase().indexOf(type.toLowerCase()) !== -1
          )
      )
    ) {
      callback(new Error(`请上传${fileTypes.join('、')}，类型文件`));
      return;
    }
  }
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
