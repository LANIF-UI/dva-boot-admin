const path = require('path');
const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less-modules');
const AutoDllPlugin = require('autodll-webpack-plugin');

module.exports = function override(config, env) {
  config.resolve = {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'components': path.resolve(__dirname, 'src/components'),
      'assets': path.resolve(__dirname, 'src/assets')
    }
  };
  
  if (env === "development") {
    config = injectBabelPlugin(["dva-hmr"], config);
  } else {
    config.output.publicPath = './';
  }

  config = injectBabelPlugin('transform-decorators-legacy', config);
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);

  config.externals = {
  }

  config.plugins.push(
    new AutoDllPlugin({
      inject: true,
      debug: true,
      filename: '[name]_[hash].js',
      path: './dll',
      entry: {
        vendor: [
          'react',
          'react-dom',
          'react-document-title',
          'dva',
          'dva-loading',
          'classnames',
        ]
      }
    })
  );

  return rewireLess.withLoaderOptions(
    `${env === 'production' ? 'app' : '[local]'}-[hash:base64:8]`,
    {
      modifyVars: {}
    }
  )(config, env);
};