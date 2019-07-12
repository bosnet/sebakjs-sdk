const { expect } = require('chai');

const sebakUtil = require('../lib/util');

describe('Keypair', () => {
  describe('generate()', () => {
    it('should create new keypair', async () => {
      const keypair = sebakUtil.keyPairGenerate();

      expect(keypair).to.have.property('seed').to.match(/^S/);
      expect(keypair).to.have.property('address').to.match(/^G/);
    });
  });

  describe('getPublicAddress()', () => {
    it('should return public address corresponding to secret seed', async () => {
      const secret = 'SBHLF2WAI2QBOR4BDEGJCQWUHW4RT7QUV6SI5I6IZXBWSTLAROLW4DYN';
      const publicAddress = sebakUtil.getPublicAddress(secret);

      expect(publicAddress).to.equal('GA3U37OXOIE4Y6BYZQ67MWY67EFMCFJU7KCLJONKWJKOWCISK4ZVOPHB');
    });
  });

  describe('verify()', () => {
    it('should verify data and signature with publick address', async () => {
      const publicAddress = 'GDVSXU343JMRBXGW3F5WLRMH6L6HFZ6IYMVMFSDUDJPNTXUGNOXC2R5Y';
      const signature = '2b1qGPhUEVaFQC4BCQVVwiJo3FhUsgzXrZRWSJmuLV82pLdULiGuqTFtNsD276vAwnhddYMrW3mKSDEQiui5GhCo';
      const networkId = 'this-is-test-sebak-network';
      const data = 'FJanX4D2WgchSfTFs94ykufp53nH1BeNFXLm8ciUrDMQ';

      const result = sebakUtil.signatureVerify(data, networkId, signature, publicAddress);

      expect(result).to.be.true;
    });
  });
});
