const { expect } = require('chai');

const { getPublicAddress, sign, verify } = require('../lib/keypair');

describe('Keypair', () => {
  describe('getPublicAddress()', () => {
    it('should return public address corresponding to secret seed', async () => {
      const secret = 'SBHLF2WAI2QBOR4BDEGJCQWUHW4RT7QUV6SI5I6IZXBWSTLAROLW4DYN';
      const publicAddress = getPublicAddress(secret);

      expect(publicAddress).to.equal('GA3U37OXOIE4Y6BYZQ67MWY67EFMCFJU7KCLJONKWJKOWCISK4ZVOPHB');
    });
  });

  describe('sign()', () => {
    it('should make signature from networkId and data', async () => {
      const secret = 'SBNHSQVQYZM24B6TSPRBD6ITOIEZHILNE24AMPZYO5UZH3QUTSVRJNDH';
      const data = 'FJanX4D2WgchSfTFs94ykufp53nH1BeNFXLm8ciUrDMQ';
      const networkId = 'this-is-test-sebak-network';

      const signature = sign(data, networkId, secret);

      expect(signature).to.equal('2b1qGPhUEVaFQC4BCQVVwiJo3FhUsgzXrZRWSJmuLV82pLdULiGuqTFtNsD276vAwnhddYMrW3mKSDEQiui5GhCo');
    });
  });

  describe('verify()', () => {
    it('should verify data and signature with publick address', async () => {
      const publicAddress = 'GDVSXU343JMRBXGW3F5WLRMH6L6HFZ6IYMVMFSDUDJPNTXUGNOXC2R5Y';
      const signature = '2b1qGPhUEVaFQC4BCQVVwiJo3FhUsgzXrZRWSJmuLV82pLdULiGuqTFtNsD276vAwnhddYMrW3mKSDEQiui5GhCo';
      const networkId = 'this-is-test-sebak-network';
      const data = 'FJanX4D2WgchSfTFs94ykufp53nH1BeNFXLm8ciUrDMQ';

      const result = verify(data, networkId, signature, publicAddress);

      expect(result).to.be.true;
    });
  });
});
