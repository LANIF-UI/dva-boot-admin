/**
 * mock-server 利用 express 来生成真实的模拟数据
 * 为了解决之前mock数据时，只针对fetch有效，且在开发人员工具Network面板中无法看到请求的问题
 */

exports.addMockServer = () => config => {
  config.before = app => {
    app.get('/test/get', (req, res) => {
      res.json({ get: 'response get' });
    });
  };
  return config;
};

