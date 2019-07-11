const StellarSdk = require('stellar-sdk')
const crypto = require('crypto');
const RLP = require('rlp');
const bs58 = require('bs58');
const sebakUtil = require('./util');

const nid = process.env.NETWORK_ID;
const trasactionFee = 10000;

module.exports = class transaction {
    constructor() {

        var operations = [];
        const createdDate = this.makeFullISOString(new Date().toISOString());

        this.tx = {
            T: 'transaction',
            H: {
                version: '1',
                created: createdDate,
                // 'hash':,
                // 'signature':
            },
            B: {
                source: '',
                fee: 0,
                sequence_id: (Number(0)),
                operations: operations,
            },
        };
    }

    addOperation(target, amount, Htype) {

        let operation;
        if (Htype === 'payment') {
            operation = {
                H: {
                    type: Htype,
                },
                B: {
                    target: target,
                    amount: (amount * 10000000).toFixed(0),
                },
            };
        } else {
            operation = {
                H: {
                    type: Htype,
                },
                B: {
                    target: target,
                    amount: (amount * 10000000).toFixed(0),
                },
            };
        }
        this.tx.B.operations.push(operation);
    }

    makeHash(Data) {
        // See https://github.com/bosnet/sebak/blob/master/lib/common/hash.go
        const encoded = RLP.encode(Data);
      
        const first = crypto.createHash('sha256').update(encoded).digest();
        const second = crypto.createHash('sha256').update(first).digest();
      
        return bs58.encode(second);
    }

    makeFullISOString(str) {
        return str.slice(0, str.length - 1) + '000000' + str.slice(str.length - 1 + Math.abs(0));
    }

    sign(secretSeed) {
        this.tx.B.fee = String(this.tx.B.operations.length*trasactionFee);
        this.tx.B.source = sebakUtil.getPublicAddress(secretSeed);

        const RLPData = this.makeRLPEncoderData();
        const hash = this.makeHash(RLPData);

        this.tx.H.hash = hash;
        
        const k = StellarSdk.Keypair.fromSecret(secretSeed);
        const sig = k.sign(Buffer.from(nid + hash));

        this.tx.H.signature = bs58.encode(sig);
    }

    makeRLPEncoderData() {
        var operations = [];
        var txBody = [];
        this.tx.B.operations.forEach(function(op) {
            let operation;
            if (op.H.type === 'payment') {
                operation = [
                    [op.H.type],
                    [op.B.target, op.B.amount],
                ];
            } else {
                operation = [
                    [op.H.type],
                    [op.B.target, op.B.amount, ''],
                ];
            }
            operations.push(operation);
        });

        txBody = [
            this.tx.B.source,
            this.tx.B.fee,
            Number(this.tx.B.sequence_id),
            operations,
        ];

        return txBody;
    }

    set sequenceId(n) {
        this.tx.B.sequence_id = (Number(n));
    }

    get hash() {
        return this.tx.H.hash;
    }

    get signature() {
        return this.tx.H.signature;
    }

    get body() {
        return this.tx.B;
    }

    get operations() {
        return this.tx.B.operations;
    }
}