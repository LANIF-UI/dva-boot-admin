import React from 'react';
import { connect } from 'dva';
import { Layout, Button } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
import Mask from 'components/Mask';
import avatar from 'assets/images/avatar.jpg';
const { Content } = Layout;

@connect()
export default class extends BaseComponent {
  state = {
    mask: {
      visible: false
    }
  };

  toggleMask = props => {
    this.setState({
      mask: {
        ...props,
        visible: !this.state.mask.visible
      }
    });
  };

  render() {
    return (
      <Layout className="full-layout page">
        <Content>
          <Panel title="Mask组件">
            <p>Mask组件可以包含任意组件，形成遮罩效果</p>
            <Button.Group>
              <Button onClick={_ => this.toggleMask()}>一般</Button>
              <Button onClick={_ => this.toggleMask({ closable: true })}>
                带x图标
              </Button>
              <Button
                onClick={_ =>
                  this.toggleMask({
                    closable: true,
                    maskClosable: false
                  })
                }
              >
                点外部关闭不了
              </Button>
              <Button onClick={_ => this.toggleMask({ className: 'search-box' })}>
                CodePen样式
              </Button>
            </Button.Group>
          </Panel>
        </Content>
        <Mask
          onClose={_ => this.toggleMask()}
          {...this.state.mask}
        >
          <img
            src={avatar}
            alt="logo"
            style={{
              position: 'absolute',
              margin: 'auto',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            }}
          />
        </Mask>
      </Layout>
    );
  }
}
