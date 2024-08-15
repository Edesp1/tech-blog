const path = require('path');

module.exports = {
  entry: './server.js', // Entry point for server-side code
  target: 'node', // Target environment is Node.js
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  mode: 'production', // Use 'development' for easier debugging
  module: {
    rules: [
      {
        test: /\.js$/, // Process JavaScript files
        exclude: /node_modules/, // Exclude files in node_modules
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'] // Preset for modern JavaScript
          }
        }
      }
    ]
  }
};