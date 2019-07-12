SEBAK.js SDK
--------------------

[![NPM Version](https://img.shields.io/npm/v/sebak-sdk.svg)](https://npmjs.org/package/sebak-sdk)


# sebakjs-sdk

`sebakjs-sdk` will introduce the basic usage of SEBAK for javascript.

## Installation

```sh
npm install --save sebak-sdk
```

## Create new transaction

### Prerequisite
Before creating new transaction, you should check these,

* 'secret seed' of source account
* 'public address' of target account
* 'network id'
* 'api url' of testNet('https://testnet-sebak.blockchainos.org') or mainNet(https://mainnet.blockchainos.org)

You can simply check 'network id' from SEBAK node information. If the address of your sebak node is 'https://testnet-sebak.blockchainos.org',
```sh
$ curl -v https://testnet-sebak.blockchainos.org
...
  "policy": {
    "network-id": "sebak-test-network",
    "initial-balance": "10000000000000000000",
    "base-reserve": "1000000",
...
```

The value of `"network-id"`, `sebak-test-network` is the 'network id'.

### Operation

For the nature of transaction of SEBAK, one `Transction` can have multple `Operation`s. `Operation` is the base unit of operating accounts like creating new account and payment. Currently SEBAK supports various kind of operations, but most of users will use `CreateAccount` and `Payment` operations.
At this time, you can up to `1000` operations in one transaction. This number can be adjusted. This limit also can be checked by node information.

### Transaction

* `sequence_id` is the last state of account. It will be varied when your account state is changed, so you should check the latest `sequence_id` from network. 
* You can get the laetst `sequence_id` from https://bosnet.github.io/sebak/api/#accounts-account-details-get .

#### Sending Transation Example

* This example is working in SEBAK TESTNET.
* For MAINNET, change `apiUrl` and `networkId`.

```javascript
const fetch = require('isomorphic-fetch');
const SebakSDK = require('sebak-sdk');

const seed = 'SBGS23GTH2R6RBNHZIW4PAA5CKH4MKEWNC63HB42KBQMCEHPUGJ5LAZP';

// In this example, target address is generated randomly.
const target = SebakSDK.sebakUtil.keyPairGenerate().address;
const amount = 10;
const apiUrl = 'https://testnet-sebak.blockchainos.org';
const networkId = 'sebak-test-network';
const transactionPath = '/api/v1/transactions';
const accountPath = '/api/v1/accounts/';
const apiTransactionUrl = url + transactionPath;
const apiAccountUrl = url + accountPath;

// Before sign the transaction, you should get the sequence_id of sending account.
fetch(apiAccountUrl + SebakSDK.sebakUtil.getPublicAddress(seed))
.then(function(res) {
    if (res.status != 200) {
        return process.exit(1);
    }
    return res.json()
})
.then(function(json) {
    tx = new SebakSDK.transaction();
    tx.addOperation(target, amount, 'create-account');
    tx.setSequenceId(Number(json.sequence_id));
    tx.sign(seed, networkId);

    fetch(apiTransactionUrl,
    {
        method: 'POST',
        timeout: 3000,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tx.tx),
    })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));
});
```

## Operations

* In SEBAK, like other cryptocurrencies there is 'fee'. 'fee' is multiplied by the number of operations in one transaction.

### `CreateAccount`

* `target` address must new account, this means, it does not exist in the SEBAK network. You can check the account status thru account API of SEBAK. Please see https://bosnet.github.io/sebak/api/#accounts-account-details-get .
* `amount` for creating account must be bigger than base reserve, you can check the amount from SEBAK node information like 'network-id'

### `Payment`

* `target` address must exist in network.
