const { expect } = require('chai');

process.env['API_URL'] = "https://testnet-sebak.blockchainos.org:443";
process.env['NETWORK_ID'] = "sebak-test-network";

const fetch = require('isomorphic-fetch');
const sebakTransaction = require('../lib/transaction');
const sebakUtil = require('../lib/util');

const url = process.env.API_URL;
const transactionPath = '/api/v1/transactions';
const accountPath = '/api/v1/accounts/';
const api_transaction_url = url + transactionPath;
const api_account_url = url + accountPath;

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
        //           "amount": "10000000000",
        //           "linked": ""
        //         }
        //       }
        //     ]
        //   }
        // }
        // 
        
        const seed = 'SBECGI3FSCYHNQIMANNCWQSVA6S5C6L4BXFKAPMBAMI5V47NWXNE37MN';
        const target = sebakUtil.keyPairGenerate().address;
        // const target = 'GDTEPFWEITKFHSUO44NQABY2XHRBBH2UBVGJ2ZJPDREIOL2F6RAEBJE4';
        
        var tx = new sebakTransaction();
        tx.addOperation(target, 1, 'create-account');

        await fetch(api_account_url + sebakUtil.getPublicAddress(seed))
        .then(res => res.json())
        .then(function(data) {
            tx.sequenceId = (Number(data.sequence_id));
        });

        tx.sign(seed);
        
        await fetch(api_transaction_url, 
        {
            method: "POST",
            timeout: 3000,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tx.tx),
        }).then(res => res.json())
        .then(function(json) {
            console.log(json);
            expect(json.status).to.be.equal('submitted');
        });
    });
});