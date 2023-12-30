const path = require('path');

module.exports = {
  // Your existing webpack configuration...

  resolve: {
    fallback: {
      "os": require.resolve("os-browserify/browser"),
      "path": require.resolve("path-browserify"),
    },
  },
};