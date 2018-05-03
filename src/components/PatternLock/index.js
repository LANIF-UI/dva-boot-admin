import React, { PureComponent } from 'react';
import PatternLock from './PatternLock';
import './style/index.less';

class Lock extends PureComponent {
  componentDidMount() {
    this.lock = new PatternLock(this.refs.patternLock, {
      enableSetPattern: true
    });

    this.onCheckPattern();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.lock !== this.props.lock) {
      this.lock.setPattern(this.props.lock);
    }
  }

  onCheckPattern = () => {
    const { lock, onChange } = this.props;
    this.lock.checkForPattern(
      lock,
      () => {
        onChange(true);
        console.log('You unlocked your app');
      },
      () => {
        onChange(false);
        console.log('Pattern is not correct');
      }
    );
  };

  render() {
    return <div ref="patternLock" />;
  }
}

export default Lock;
