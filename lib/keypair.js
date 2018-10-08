const Base = require('stellar-base');
const bs58 = require('bs58');

module.exports = {
  generate: () => {
    const k = Base.Keypair.random();

    return {
      seed: k.secret(),
      address: k.publicKey(),
    };
  },
  getPublicAddress: (secretSeed) => {
    const k = Base.Keypair.fromSecret(secretSeed);

    return k.publicKey();
  },
  sign: (dataToSign, networkId, secretSeed) => {
    const k = Base.Keypair.fromSecret(secretSeed);
    const sig = k.sign(Buffer.from(networkId + dataToSign));

    return bs58.encode(sig);
  },
  verify: (data, networkId, base58Signature, publicKey) => {
    const k = Base.Keypair.fromPublicKey(publicKey);
    const sig = bs58.decode(base58Signature);

    return k.verify(Buffer.from(networkId + data), Buffer.from(sig));
  },
};
