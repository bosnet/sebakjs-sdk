const RLP = require('rlp');
const argon2 = require('argon2');
const bs58 = require('bs58');

const ARGON_SALT = Buffer.from('boscoin-sebak-network');

module.exports = async (rlpData) => {
  // See https://github.com/bosnet/sebak/blob/master/lib/common/hash.go
  const encoded = RLP.encode(rlpData);
  const hash = await argon2.hash(encoded, {
    salt: ARGON_SALT,
    hashLength: 32,
    raw: true,
    timeCost: 3,
    memoryCost: 32 * 1024,
    parallelism: 4,
  });

  return bs58.encode(hash);
};
