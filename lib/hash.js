const crypto = require('crypto');
const RLP = require('rlp');
const bs58 = require('bs58');

module.exports = (rlpData) => {
  // See https://github.com/bosnet/sebak/blob/master/lib/common/hash.go
  const encoded = RLP.encode(rlpData);

  const first = crypto.createHash('sha256').update(encoded).digest();
  const second = crypto.createHash('sha256').update(first).digest();

  return bs58.encode(second);
};
