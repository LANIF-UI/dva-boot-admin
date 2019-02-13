const {
  override,
  addDecoratorsLegacy,
  disableEsLint,
  addBundleVisualizer,
  addWebpackAlias,
  adjustWorkbox,
  addLessLoader,
  fixBabelImports
} = require('customize-cra');
const path = require('path');

module.exports = override(
  addDecoratorsLegacy(),
  disableEsLint(),
  process.env.BUNDLE_VISUALIZE === 1 && addBundleVisualizer(),
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
    modifyVars: {}
  }),
);
