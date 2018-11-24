# Building

In order to build this project, from the root directory type `$ npm run build`

In order to test that the webpack is built correctly, navigate to the
build_webpack folder with `$ cd build_webpack` and then open index.html with
`$ open index.html`.

TLDR; `$ npm run build && cd build_webpack && open index.html`


# @dev

EthTipJar.deployed().then(function(res){ETJ = EthTipJar.at(res.address)})
