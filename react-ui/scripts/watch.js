process.env.NODE_ENV = 'production';

const fs = require('fs-extra');
const paths = require('react-scripts-ts/config/paths');
const webpack = require('webpack');
const config = require('react-scripts-ts/config/webpack.config.prod.js');

// removes react-dev-utils/webpackHotDevClient.js at first in the array
config.entry.shift();

console.log('public url:', process.env.PUBLIC_URL)

webpack(config).watch({}, (err, stats) => {
  if (err) {
    console.error(err);
  } else {
    copyPublicFolder();
  }
  console.error(stats.toString({
    chunks: false,
    colors: true
  }));
});

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml
  });
}