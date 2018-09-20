SEBAK.js util
--------------------

* `hash` - make a hash from RLP data, e.g. Transaction
  * Arguments :
    * RLP data(`array`)
  * Return `Promise`
* `getPublicAddress` - return public address from secret seed
  * Arguments :
    * secret seed(`String`)(e.g. `SBHLF2WAI2QBOR4BDEGJCQWUHW4RT7QUV6SI5I6IZXBWSTLAROLW4DYN`)
  * Return public address(`String`)(e.g. `GA3U37OXOIE4Y6BYZQ67MWY67EFMCFJU7KCLJONKWJKOWCISK4ZVOPHB`)
* `sign` - sign with given data
  * Arguments :
    * data to sign(`String`)
    * network id(`String`) - sebak network id
    * secret seed(`String`)(e.g. `SBHLF2WAI2QBOR4BDEGJCQWUHW4RT7QUV6SI5I6IZXBWSTLAROLW4DYN`)
  * Return base58 encoded signature(`String`)
* `verify` - verify signature with given data
  * Arguments :
    * signed data (`String`)
    * network id(`String`) - sebak network id
    * base58 encoded signature(`String`)
    * public address(`String`)(e.g. `GA3U37OXOIE4Y6BYZQ67MWY67EFMCFJU7KCLJONKWJKOWCISK4ZVOPHB`)
  * Return `Boolean`
