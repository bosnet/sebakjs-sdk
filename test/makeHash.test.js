const { expect } = require('chai');

process.env['NETWORK_ID'] = "sebak-test-network";

const sebakTransaction = require('../lib/transaction');

describe('Hash', () => {
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

    var tx = new sebakTransaction();
    tx.addOperation('GDTEPFWEITKFHSUO44NQABY2XHRBBH2UBVGJ2ZJPDREIOL2F6RAEBJE4', 1000, 'create-account');
    tx.sequenceId = 0;
    tx.sign('SBECGI3FSCYHNQIMANNCWQSVA6S5C6L4BXFKAPMBAMI5V47NWXNE37MN');
    const result1 = tx.hash;
    const result2 = tx.signature;
    console.log(tx.tx);
    expect(result1).to.equal('AAu1frX9fYBpbDqVPmq3VLfL2YxSD1ZEvoSDAZag6ig6');
    expect(result2).to.equal('4uhLAvEj131UxyQ9Jzyc92gj5GhdNBeSKGmkG4vf3GA3oETjggWjgCGmbYzNPHF6FKbu6h3KyxD4ed5LRyt7rWEM');
  });
});
