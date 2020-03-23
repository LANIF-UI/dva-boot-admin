const {
  override,
  addDecoratorsLegacy,
  disableEsLint,
  addBundleVisualizer,
  addWebpackAlias,
  adjustWorkbox,
  addLessLoader,
  fixBabelImports,
  overrideDevServer
} = require('customize-cra');
const path = require('path');
const { addMockServer } = require('./mock-server');

module.exports = {
  webpack: override(
    addDecoratorsLegacy(),
    disableEsLint(),
    addBundleVisualizer({}, true),
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src'),
      components: path.resolve(__dirname, 'src/components'),
      assets: path.resolve(__dirname, 'src/assets')
    }),
    adjustWorkbox(wb =>
      Object.assign(wb, {
        skipWaiting: true,
        exclude: (wb.exclude || []).concat('index.html')
      })
    ),
    fixBabelImports('import', {
      libraryName: 'antd',
      style: true
    }),
    addLessLoader({
      localIdentName: '[local]--[hash:base64:8]',
      javascriptEnabled: true,
      modifyVars: {}
    })
  ),
  devServer: overrideDevServer(
    process.env.MOCK === 'SERVER' ? addMockServer() : null
  )
};
