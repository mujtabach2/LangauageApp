import path from "path";

module.exports = {
  // Other webpack configuration options...

  resolve: {
    fallback: {
      "os": require.resolve("os-browserify/browser")
    }
  },

  // Other webpack configuration options...
};
