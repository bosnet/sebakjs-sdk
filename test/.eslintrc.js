module.exports = {
  env: {
    mocha: true,
  },
  plugins: [
    'mocha',
  ],
  rules: {
    'mocha/no-exclusive-tests': 'error',
    'max-len': 'off',
    'no-unused-expressions': 'off',
  },
};