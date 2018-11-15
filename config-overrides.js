const path = require('path');
const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less-modules');
const baseURL = require('./package.json').baseURL;

module.exports = function override(config, env) {
  config.resolve = {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      components: path.resolve(__dirname, 'src/components'),
      assets: path.resolve(__dirname, 'src/assets')
    }
  };

  if (env === 'development') {
    config = injectBabelPlugin(['dva-hmr'], config);
  } else {
    if (baseURL) {
      config.output.publicPath = baseURL.slice(-1) !== '/' ? baseURL + '/' : baseURL; // 跟据实际项目设置 
    }
  }

  config = injectBabelPlugin('transform-decorators-legacy', config);
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', style: true }],
    config
  );

  config.externals = {};

  return rewireLess.withLoaderOptions(
    `${env === 'production' ? 'app' : '[local]'}-[hash:base64:8]`,
    {
      modifyVars: {}
    }
  )(config, env);
};
