const { expect } = require('chai');

const hash = require('../lib/hash');

describe('hash', () => {
  it('should make a hash from transaction RLP data', async () => {
    // transaction example
    // {
    //   "T": "transaction",
    //   "H": {
    //     "version": "",
    //       "created": "2018-01-01T00:00:00.000000000Z",
    //       "hash": "D2EMY1T1oLFFELMa7BySmtB7FbSF7YPe1ae8reXDsEPQ",
    //       "signature": "5zdcFUaYAXZ7ZNyKWzfw2b9GENS65mFtgXC4KVcXhJWAARGAHLa1faewwdCEMuQVgaHQojd6r86svXP8xn4zKvCT"
    //   },
    //     "B": {
    //     "source": "GDIRF4UWPACXPPI4GW7CMTACTCNDIKJEHZK44RITZB4TD3YUM6CCVNGJ",
    //       "fee": "10000",
    //       "sequenceID": 0,
    //       "operations": [
    //       {
    //         "H": {
    //           "type": "create-account"
    //         },
    //         "B": {
    //           "target": "GDTEPFWEITKFHSUO44NQABY2XHRBBH2UBVGJ2ZJPDREIOL2F6RAEBJE4",
    //           "amount": "10000000000"
    //         }
    //       }
    //     ]
    //   }
    // }

    const tx = [
      'GDIRF4UWPACXPPI4GW7CMTACTCNDIKJEHZK44RITZB4TD3YUM6CCVNGJ',
      10000,
      0,
      [[
        ['create-account'],
        ['GDTEPFWEITKFHSUO44NQABY2XHRBBH2UBVGJ2ZJPDREIOL2F6RAEBJE4', 10000000000],
      ]],
    ];

    const result = await hash(tx);
    expect(result).to.equal('D2EMY1T1oLFFELMa7BySmtB7FbSF7YPe1ae8reXDsEPQ');
  });
});
