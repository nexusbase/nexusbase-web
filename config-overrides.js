const path = require('path');
const { override, addBabelPlugins, babelInclude } = require('customize-cra');

module.exports = {
  webpack: override(
    ...addBabelPlugins('@babel/plugin-proposal-class-properties'),
    babelInclude([
        // MONOREPO WITH HOIST
        // path.resolve(__dirname, '../../../node_modules/@ui-kitten'),
        // path.resolve(__dirname, '../../../node_modules/@eva-design'),
        path.resolve(__dirname, './node_modules/@ui-kitten'),
        path.resolve(__dirname, './node_modules/@eva-design'),
        path.resolve(__dirname, 'src'),
    ]),
  ),
  paths: function (paths, env) {        
    //paths.appPublic = path.join('web');
    paths.appHtml = path.join('web/index.html');
    paths.appBuild = path.join('build/web');
    return paths;
  },
};
