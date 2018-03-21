const path = require('path');

module.exports = {
  entry: './src/ballernoi.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  resolve: {
  extensions: [".js", ".jsx", "*"]
}
};
