module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  externals: ['electron']
}
