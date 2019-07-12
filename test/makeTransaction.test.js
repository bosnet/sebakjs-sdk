const { expect } = require('chai');
const fetch = require('isomorphic-fetch');

const config = require('../lib/config');
const Transaction = require('../lib/transaction');
const sebakUtil = require('../lib/util');

const url = config.TESTNET_ADDR;
const transactionPath = '/api/v1/transactions';
const accountPath = '/api/v1/accounts/';
const apiTransactionUrl = url + transactionPath;
const apiAccountUrl = url + accountPath;

describe('Sending transaction \n', () => {
    it('should get a success response from testnet', async () => {

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
        //           "amount": "10000000",
        //           "linked": ""
        //         }
        //       }
        //     ]
        //   }
        // }
        //

        const seed = 'SBGS23GTH2R6RBNHZIW4PAA5CKH4MKEWNC63HB42KBQMCEHPUGJ5LAZP';
        const target = sebakUtil.keyPairGenerate().address;
        // const target = 'GDTEPFWEITKFHSUO44NQABY2XHRBBH2UBVGJ2ZJPDREIOL2F6RAEBJE4';

        tx = new Transaction();
        tx.addOperation(target, 1, 'create-account');

        await fetch(apiAccountUrl + sebakUtil.getPublicAddress(seed))
        .then(res => res.json())
        .then(data => tx.setSequenceId(Number(data.sequence_id)))
        .catch(err => console.log(err));

        tx.sign(seed, config.TESTNET_NETWORK_ID);

        await fetch(apiTransactionUrl,
        {
            method: 'POST',
            timeout: 3000,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tx.tx),
        }).then(res => res.json())
        .then(json => expect(json.status).to.be.equal('submitted'))
        .catch(err => console.log(err));
    });
});