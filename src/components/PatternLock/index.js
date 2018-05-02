import React, { PureComponent } from 'react';
import PatternLock from './PatternLock';
import './style/index.less';

class Lock extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lock: props.lock
    };
  }

  componentDidMount() {
    this.lock = new PatternLock(this.refs.patternLock, {
      onDraw: pattern => {
        console.log(pattern);
      }
    });

    this.lock.checkForPattern(this.props.lock, () => {
        alert("You unlocked your app");
    },function(){
        alert("Pattern is not correct");
    });
  }

  componentDidUpdate(prevProps, prevState) {
    
  }

  render() {
    return (
      <div ref="patternLock" />
    );
  }
}

export default Lock;