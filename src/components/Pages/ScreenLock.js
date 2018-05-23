import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Layout, Button } from 'antd';
import PatternLock from '../PatternLock';
import Clock from '../Clock';
import Mask from '../Mask';
import logoImg from 'assets/images/logo-r.png';
import pattern from 'assets/images/pattern.png';
import CSSAnimate from '../CSSAnimate';
const { Content } = Layout;

/**
 * 锁屏界面
 */
class ScreenLock extends PureComponent {
  state = {
    showPattern: false,
    patternError: null
  };

  static contextTypes = {
    router: PropTypes.object
  };

  onChange = lock => {
    if (lock) {
      this.context.router.history.replace('/dashboard');
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
                icon="question-circle"
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
