import React, { PureComponent } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Layout, Button } from 'antd';
import PatternLock from '../PatternLock';
import Clock from '../Clock';
import Mask from '../Mask';
import logoImg from 'assets/images/logo-r.png';
import pattern from 'assets/images/pattern.png';
import CSSAnimate from '../CSSAnimate';
import { router } from 'dva';
const { Content } = Layout;
const { withRouter } = router;

/**
 * 锁屏界面
 */
@withRouter
class ScreenLock extends PureComponent {
  state = {
    showPattern: false,
    patternError: null
  };

  onChange = lock => {
    if (lock) {
      this.props.history.replace('/dashboard');
    } else {
      this.setState({
        patternError: true
      });
    }
  };

  togglePattern = () => {
    this.setState({
      showPattern: !this.state.showPattern
    });
  };

  render() {
    const { title } = this.props;
    const { patternError, showPattern } = this.state;
    return (
      <Layout className="full-layout screen-lock-page">
        <Content>
          <div className="container">
            <div className="pattern-logo">
              <img src={logoImg} alt="logo" />
              <b>LANIF</b>
              <span>Admin</span>
            </div>
            <div className="patter-container">
              <div className="patter-title">{title || '欢迎您回来'}</div>
              <p>使用图案进行解锁</p>
              <CSSAnimate
                className="animated-short"
                type={patternError ? 'shake' : ''}
                callback={_ => this.setState({ patternError: false })}
              >
                <PatternLock lock="14753" onChange={this.onChange} />
              </CSSAnimate>
            </div>
            <div className="patter-tip">
              <Button
                type="primary"
                icon={<QuestionCircleOutlined />}
                onClick={this.togglePattern}
              >
                图案提示
              </Button>
            </div>
          </div>
          <Clock />
        </Content>
        <Mask visible={showPattern} onClose={this.togglePattern}>
          <CSSAnimate
            className="animated-short pattern-tip-modal"
            type={showPattern ? 'flipInY' : 'fadeOutUp'}
          >
            <img src={pattern} alt="14753" />
          </CSSAnimate>
        </Mask>
      </Layout>
    );
  }
}

export default ScreenLock;
