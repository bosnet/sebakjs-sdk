const StellarSdk = require('stellar-sdk');
const bs58 = require('bs58');

const keyPairGenerate = () => {
    const k = StellarSdk.Keypair.random();

    return {
      seed: k.secret(),
      address: k.publicKey(),
    };
};

const getPublicAddress = (secretSeed) => {
    const k = StellarSdk.Keypair.fromSecret(secretSeed);

    return k.publicKey();
};

const signatureVerify = (data, networkId, base58Signature, publicKey) => {
    const k = StellarSdk.Keypair.fromPublicKey(publicKey);
    const sig = bs58.decode(base58Signature);

    return k.verify(Buffer.from(networkId + data), Buffer.from(sig));
};

module.exports = {
    getPublicAddress,
    signatureVerify,
    keyPairGenerate,
};