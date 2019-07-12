const { expect } = require('chai');
const config = require('../lib/config');
const Transaction = require('../lib/transaction');

describe('Hash', () => {
  it('should make a hash from transaction RLP data', async () => {
    // transaction example
    // {
    //   "T": "transaction",
    //   "H": {
    //     "version": "",
    //       "created": "2018-01-01T00:00:00.000000000Z",
    //       "hash": "BfWMfTzzA3jBKvj3vqwiJUKeFWEGHDj32zr8GdbDwFPv",
    //       "signature": "bSj4idzYskP9nhus7jHAFWDEJhej5WoCYb3esYyBP7Vms8RtZ5c4bxv2sUcAWfcTG8dNELbTNhrF1eYRwZ3kWWG"
    //   },
    //     "B": {
    //       "source": "GCVLZQPCWBCTB3XI5ZZONHBJSW6LY2AV53L3TIQ7FSRLHDG7M3UMBVFG",
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

    const tx = new Transaction();
    tx.addOperation('GDTEPFWEITKFHSUO44NQABY2XHRBBH2UBVGJ2ZJPDREIOL2F6RAEBJE4', 1000, 'create-account');
    tx.sequenceId = 0;
    tx.sign('SBGS23GTH2R6RBNHZIW4PAA5CKH4MKEWNC63HB42KBQMCEHPUGJ5LAZP', config.TESTNET_NETWORK_ID);
    const result1 = tx.hash;
    const result2 = tx.signature;

    expect(result1).to.equal('BfWMfTzzA3jBKvj3vqwiJUKeFWEGHDj32zr8GdbDwFPv');
    expect(result2).to.equal('bSj4idzYskP9nhus7jHAFWDEJhej5WoCYb3esYyBP7Vms8RtZ5c4bxv2sUcAWfcTG8dNELbTNhrF1eYRwZ3kWWG');
  });
});
