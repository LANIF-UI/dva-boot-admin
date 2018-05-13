// 全局 G2 设置
import { track, setTheme } from 'bizcharts';
import Charts from './Charts';
import Bar from './Bar';

const config = {
  defaultColor: '#1089ff',
  shape: {
    interval: {
      fillOpacity: 1
    }
  }
};

track(false);
setTheme(config);
export default Charts;
export {
  Bar
}
