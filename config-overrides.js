const path = require('path');
const { override, addBabelPlugins, babelInclude } = require('customize-cra');

module.exports = {
  webpack: override(
    ...addBabelPlugins('@babel/plugin-proposal-class-properties'),
    babelInclude([
        path.resolve(__dirname, './node_modules/@ui-kitten'),
        path.resolve(__dirname, './node_modules/@eva-design'),
        path.resolve(__dirname, 'src'),
    ]),
  ),
  paths: function (paths, env) {        
    paths.appPublic = path.resolve('web');
    paths.appHtml = path.resolve('web/index.html');
    paths.appBuild = path.resolve('build/web');
    return paths;
  },
};
