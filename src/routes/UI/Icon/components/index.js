import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Icon from 'components/Icon';
import Panel from 'components/Panel';
import './index.less';
const { Content } = Layout;

@connect()
export default class extends BaseComponent {
  render() {
    return (
      <Layout className="full-layout page icon-page">
        <Content>
          <Panel title="Icon 用法">
            <p>
              Icon继承Antd的Icon组件，可以使用Andt的图标，而且可以自已扩展第三方的iconfont图标。
            </p>
            <p>默认图标：<code>{`<Icon type="图标名" />`}</code></p>
            <p>Antd图标：<code>{`<Icon type="antd图标名" antd />`}</code></p>
            <p>其它图标库：<code>{`<Icon type="图标名" font="iconfont" />`}</code> <Icon type="location" font="iconfont" /></p>
            <p>直接使用unicode（需要加大括号）：<code>{`<Icon type={"&#xe734;"} font="iconfont" />`}</code> <Icon type={"&#xe734;"} font="iconfont" /></p>
          </Panel>
          <Panel title="默认图标">
            <ul className="icon-page-list clearfix">
              {icomoonlist.map(icon => (
                <li key={icon} className="icon-item">
                  <Icon type={icon} />
                  <span className="icon-name">{icon}</span>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Antd图标">
            <ul className="icon-page-list clearfix">
              {antdlist.map(icon => (
                <li key={icon} className="icon-item">
                  <Icon type={icon} antd />
                  <span className="icon-name">{icon}</span>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="其它图标库">
            <ul className="icon-page-list clearfix">
              <li className="icon-item">
                <Icon type="loading" font="iconfont" spin />
                <span className="icon-name">loading</span>
              </li>
              {otherlist.map(icon => (
                <li key={icon} className="icon-item">
                  <Icon type={icon} font="iconfont" />
                  <span className="icon-name">{icon}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </Content>
      </Layout>
    );
  }
}

const icomoonlist = [
  'lines', 'wand', 'radio-tower', 'ruby', 'screen-full', 'home', 'image', 'camera', 'play', 'equalizer', 
  'headphones', 'message', 'mail', 'man', 'woman', 'user', 'ring', 'gear', 'increase', 'decrease', 'users', 
  'poweroff', 'check', 'close', 'into', 'trash', 'minus', 'plus', 'refresh', 'sync', 'enlarge', 'shrink', 
  'edit', 'buret', 'finder', 
];

const antdlist = [
  'android', 'android-o', 'apple', 'apple-o', 'windows', 'windows-o', 'ie', 'chrome', 'github', 'aliwangwang', 'aliwangwang-o', 'dingding', 'dingding-o',
  'weibo-square', 'weibo-circle', 'taobao-circle', 'html5', 'weibo', 'twitter', 'wechat', 'youtube', 'alipay-circle', 'taobao', 'skype', 'qq', 'medium-workmark', 'gitlab', 'medium', 'linkedin', 'google-plus',
  'dropbox', 'facebook', 'codepen', 'amazon', 'google', 'codepen-circle', 'alipay', 'ant-design', 'aliyun', 'zhihu', 'slack', 'slack-square', 'behance', 'behance-square', 'dribbble', 'dribbble-square', 'instagram', 'yuque',
]

const otherlist = [
  'rmb', 'card', 'list', 'search', 'location', 'pulldown', 'mine-o', 'mine', 'password', 
  'caret-right', 'caret-left', 'caret-down', 'caret-top', 'check', 'cross', 'right', 'left', 'top', 
  'bottom', 'arrow-top', 'arrow-bottom', 'add', 'minus', 'info-circle-o', 'info-circle', 'warning-o', 
  'warning', 'cross-circle-o', 'cross-circle', 'check-circle-o', 'check-circle', 'delete', 'back', 
  'upload', 'download', 'up-circle', 'down-circle', 
]
