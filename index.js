const hash = require('./lib/hash');
const { getPublicAddress, sign, verify } = require('./lib/keypair');

module.exports = {
  hash,
  getPublicAddress,
  sign,
  verify,
};
