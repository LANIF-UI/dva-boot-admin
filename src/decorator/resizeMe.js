import React, { PureComponent } from 'react';
import { ResizeSensor } from 'css-element-queries';
import $$ from 'cmn-utils';
const {debounce, throttle} = $$;

/**
 * 在一个类上增加这个装饰器，可以监听组件的大小变化
 * @param {*} options
 */
const defaultConfig = {
  refreshRate: 16,
  refreshMode: 'throttle',
}

const resizeMe = (config = defaultConfig) => {
  const refreshFunc = config.refreshMode === 'throttle' ? throttle : debounce;

  return WrappedComponent => {
    return class extends PureComponent {
      constructor(props) {
        super(props);
        this.onResizeStrategy = refreshFunc(this.onResize, config.refreshRate);
        this.state = {
          width: undefined,
          height: undefined,
          position: undefined,
        }
      }

      componentDidMount() {
        const element = this.refs.element;
        this.resizeSensor = new ResizeSensor(element, this.onResizeStrategy);
        this.onResizeStrategy();
      }
    
      componentWillUnmount() {
        const element = this.refs.element;
        this.resizeSensor.detach(element, this.onResizeStrategy);
      }
    
      onResize = () => {
        const element = this.refs.element;
    
        const { width, height, paddingLeft, paddingRight, paddingTop, paddingBottom } = getComputedStyle(element);
    
        this.setState({
          width: parseInt(width, 10) - parseInt(paddingLeft, 10) - parseInt(paddingRight, 10),
          height: parseInt(height, 10) - parseInt(paddingTop, 10) - parseInt(paddingBottom, 10),
        })
      }
      
      render() {
        const { width, height } = this.state;
        const styles = {
          position: 'relative',
          width: '100%',
          height: '100%',
        }
        return (
          <div ref="element" style={styles}>
            {width && height ? (
              <WrappedComponent ref="" {...this.props} size={{...this.state}} />
            ) : null}
          </div>
        );
      }
    };
  };
}

export default resizeMe;
