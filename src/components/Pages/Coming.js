import './style/coming.less';
import React, { Component } from 'react';
import { Layout } from 'antd';
const { Content } = Layout;

class Coming extends Component {
  render() {
    return (
      <Layout className="full-layout coming-soon-page">
        <Content>
          <div id="wrapper">
            <div className="place_balk_workers">
              <div className="balk_workers" />
              <div className="saw" />
              <div className="balk" />
            </div>

            <h3 className="title">精彩即将呈现</h3>

            <div id="watch">
              <div className="dash days_dash">
                <div className="digit">00</div>
                <span className="dash_title">天</span>
              </div>
              <div className="dash hours_dash">
                <div className="digit">00</div>
                <span className="dash_title">时</span>
              </div>
              <div className="dash minutes_dash">
                <div className="digit">00</div>
                <span className="dash_title">分</span>
              </div>
              <div className="dash seconds_dash">
                <div className="digit">00</div>
                <span className="dash_title">秒</span>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default Coming;
