import webpack from 'webpack';

export default function override(config) {
  const fallback = config.resolve.fallback || {};
  
  Object.assign(fallback, {
    "crypto": import.meta.resolve('crypto-browserify'),
    "stream": import.meta.resolve('stream-browserify'),
    "assert": import.meta.resolve('assert'),
    "http": import.meta.resolve('stream-http'),
    "https": import.meta.resolve('https-browserify'),
    "os": import.meta.resolve('os-browserify'),
    "url": import.meta.resolve('url')
  });

  config.resolve.fallback = fallback;

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ]);

  return config;
}
