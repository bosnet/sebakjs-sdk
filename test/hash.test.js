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
    //       "hash": "7mRUj4cnUPaTrpByojPsT3xoRRdwG6Q9z2eLyCMapQm6",
    //       "signature": "4ty1Pv7Phc3CEeGLCP8mjZfEC259VR1MBgyVHzQXTcWjuSiwxVQ2AQKxy2HjGTCDrmdE29z8ZNZ6GxuDyEay2p9M"
    //   },
    //     "B": {
    //       "source": "GDIRF4UWPACXPPI4GW7CMTACTCNDIKJEHZK44RITZB4TD3YUM6CCVNGJ",
    //       "fee": "10000",
    //       "sequenceID": 0,
    //       "operations": [
    //       {
    //         "H": {
    //           "type": "create-account"
    //         },
    //         "B": {
    //           "target": "GDTEPFWEITKFHSUO44NQABY2XHRBBH2UBVGJ2ZJPDREIOL2F6RAEBJE4",
    //           "amount": "10000000000",
    //           "linked": ""
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
        ['GDTEPFWEITKFHSUO44NQABY2XHRBBH2UBVGJ2ZJPDREIOL2F6RAEBJE4', 10000000000, ""],
      ]],
    ];

    const result = hash(tx);
    expect(result).to.equal('7mRUj4cnUPaTrpByojPsT3xoRRdwG6Q9z2eLyCMapQm6');
  });
});
