import './style/index.less';
import React, { Component } from 'react';
import cx from 'classnames';
import Icon from '../Icon';
import { Tabs, Radio, Tag } from 'antd';
import $$ from 'cmn-utils';
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;

/**
 * 设置皮肤的右侧滑动的面板
 */
class SkinToolbox extends Component {
  onChangeSideColor = e => {
    this.props.onChangeTheme({
      ...this.props.theme,
      leftSide: e.target.value
    });
  };

  clearThemeStore = _ => {
    $$.removeStore('theme');
  }

  render() {
    const { collapsed, toggleSkinToolbox, theme } = this.props;

    const classnames = cx('skin-toolbox', {
      'skin-toolbox-close': collapsed
    });

    return (
      <div className={classnames}>
        <div className="panel">
          <div className="panel-head" onClick={toggleSkinToolbox}>
            <span className="panel-icon">
              <Icon type="gear" />
            </span>
            <span className="panel-title">设置您的主题</span>
          </div>
          <div className="panel-body">
            <Tabs defaultActiveKey="1" size="small">
              <TabPane tab="导航条" key="navbar">
                Content of Tab Pane 1
              </TabPane>
              <TabPane tab="边栏" key="sidebar" className="tab-sidebar">
                <h4>边栏样式</h4>
                <RadioGroup
                  onChange={this.onChangeSideColor}
                  value={theme.leftSide}
                >
                  <Radio className="dark" value="dark">
                    <Tag color="#001529">深色</Tag>
                  </Radio>
                  <Radio className="grey" value="grey">
                    <Tag color="#aaa">浅灰</Tag>
                  </Radio>
                  <Radio className="light" value="light">
                    <Tag color="#efefef" style={{ color: '#666' }}>
                      亮白
                    </Tag>
                  </Radio>
                </RadioGroup>
              </TabPane>
              <TabPane tab="布局" key="misc">
                Content of Tab Pane 3
              </TabPane>
            </Tabs>
          </div>
          <div className="panel-footer">
            <a className="btn-primary" onClick={this.clearThemeStore}>清理存储</a>
          </div>
        </div>
      </div>
    );
  }
}

export default SkinToolbox;
