import React from 'react';
import { Button } from 'antd';
import Upload from '../../Upload';
import omit from 'object.omit';
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
  maxFileSize, // 最大文件大小
  fileTypes, // 允许文件类型
  action,    // 后台地址
  fileName,  // 上传到后台的文件名
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
    listType: 'picture',
    beforeUpload: file => false,
  }

  // 真接上传到后台
  if (action) {
    uploadProps = omit(otherProps, ['beforeUpload']);
    uploadProps.action = action;
    uploadProps.name = fileName || 'file';
  } 

  return getFieldDecorator(name, {
    valuePropName: 'fileList',
    getValueFromEvent: normFile,
    ...formFieldOptions
  })(
    <Upload {...uploadProps} {...otherProps}>
      {renderUpload ? (
        renderUpload(form, record, isDisabled(max, form.getFieldValue(name)))
      ) : (
        <Button
          icon={btnIcon}
          disabled={isDisabled(max, form.getFieldValue(name))}
        >
          点击上传
        </Button>
      )}
    </Upload>
  );
};

const validatorFileSize = (maxFileSize, value, callback) => {
  if (value.some(item => item.size > maxFileSize * 1024)) {
    callback(new Error(`请上传文件大小在${maxFileSize}K以内的图片`));
    return;
  }
};

const validatorFileTypes = (fileTypes, value, callback) => {
  if ($$.isArray(fileTypes) && fileTypes.length > 0) {
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
