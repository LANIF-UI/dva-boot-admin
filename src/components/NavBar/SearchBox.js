import React, { PureComponent } from 'react';
import Icon from '../Icon';
import Mask from '../Mask';
import { Radio } from 'antd';
const RadioGroup = Radio.Group;

/**
 * 全屏搜索
 */
class SearchBox extends PureComponent {
  render() {
    const { visible, onClose } = this.props;
    return (
      <Mask visible={visible} onClose={onClose} className="search-box" closable>
        <div className="search-box-input">
          <input ref="input" type="text" placeholder="搜索..." />
          <a className="search-box-btn"><Icon type="search" antd /></a>
        </div>
        <div className="search-box-content">
          <RadioGroup name="radiogroup" defaultValue={1}>
            <Radio value={1}>用户</Radio>
            <Radio value={2}>部门</Radio>
            <Radio value={3}>文章</Radio>
            <Radio value={4}>所有</Radio>
          </RadioGroup>
        </div>
      </Mask>
    );
  }
}

export default SearchBox;