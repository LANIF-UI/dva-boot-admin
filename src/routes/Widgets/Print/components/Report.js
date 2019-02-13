import React, { Component } from 'react';
import { Checkbox } from 'antd';
import './report.less';
const CheckboxGroup = Checkbox.Group;

/**
 * 示例报表打印
 */
class Report extends Component {
  render() {
    const plainOptions = [
      {value: '1066001', label: '开发实施'},
      {value: '1066002', label: '测试'},
      {value: '1066003', label: '试运行'},
    ];
    return (
      <div className="system-audit-pring">
        <table className="tg">
          <tbody>
          <tr>
            <th className="tg-wp8o" colSpan="5">
              <h1>XX部署/实施会签单</h1>
              <h3 className="version">版本号：20181121</h3>
            </th>
          </tr>
          <tr>
            <td className="tg-obcv left1" rowSpan="5">申请人填写项</td>
            <td className="tg-obcv left2 hfixed">系统名称</td>
            <td className="tg-73oq" colSpan="3"></td>
          </tr>
          <tr>
            <td className="tg-obcv left2 hfixed">系统状态</td>
            <td className="tg-73oq" colSpan="3">
              <CheckboxGroup options={plainOptions} />
            </td>
          </tr>
          <tr>
            <td className="tg-obcv left2 hfixed">负责系统业务部门</td>
            <td className="tg-73oq" colSpan="3"></td>
          </tr>
          <tr>
            <td className="tg-obcv left2">系统说明</td>
            <td className="tg-73oq xtsm-content" colSpan="3">
              <i>（简要说明系统基本情况：主要功能、部署方式、硬件架构、软件架构等。如：所需服务器类型、数量、配置；应用数据库种类及版本等。）</i>
              <p></p>
            </td>
          </tr>
          <tr>
            <td className="tg-73oq h20" colSpan="2">
              <div className="w50">
                申请单位： 
                <div className="sign">负责人签字：<br />(加盖公章)</div>
                <div className="date">&nbsp;年&emsp;月&emsp;日</div>
              </div>
            </td>
            <td className="tg-73oq" colSpan="2">
              <div className="w50">
                实施单位： 
                <div className="sign">负责人签字：<br />(加盖公章)</div>
                <div className="date">&nbsp;年&emsp;月&emsp;日</div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="tg-qtf5 left1">审批项</td>
            <td className="tg-73oq h20" colSpan="2">
              <div className="w50">
                业务部门意见：
                <p></p>
                <div className="sign">负责人签字：<br />(加盖公章)</div>
                <div className="date">&nbsp;年&emsp;月&emsp;日</div>
              </div>
            </td>
            <td className="tg-73oq" colSpan="2">
              <div className="w50">
                科技信息部意见：
                <p></p>
                <div className="sign">负责人签字：<br />(加盖公章)</div>
                <div className="date">&nbsp;年&emsp;月&emsp;日</div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Report;