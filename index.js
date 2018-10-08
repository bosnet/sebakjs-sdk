const hash = require('./lib/hash');
const {
  generate,
  getPublicAddress,
  sign,
  verify,
} = require('./lib/keypair');

module.exports = {
  hash,
  generate,
  getPublicAddress,
  sign,
  verify,
};
