import './style/coming.less';
import React, { Component } from 'react';
import { Layout, Button } from 'antd';
const { Content } = Layout;

class Coming extends Component {
  render() {
    return (
      <Layout className="full-layout coming-soon-page">
        <Content>
          <div id="wrapper">
            <div class="place_balk_workers">
              <div class="balk_workers" />
              <div class="saw" />
              <div class="balk" />
            </div>

            <h3 class="title">精彩即将呈现</h3>

            <div id="watch">
              <div class="dash days_dash">
                <div class="digit">00</div>
                <span class="dash_title">天</span>
              </div>
              <div class="dash hours_dash">
                <div class="digit">00</div>
                <span class="dash_title">时</span>
              </div>
              <div class="dash minutes_dash">
                <div class="digit">00</div>
                <span class="dash_title">分</span>
              </div>
              <div class="dash seconds_dash">
                <div class="digit">00</div>
                <span class="dash_title">秒</span>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default Coming;
