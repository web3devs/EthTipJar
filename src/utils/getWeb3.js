import Web3 from 'web3'

let getWeb3 = new Promise(function(resolve, reject) {

  window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
            // Acccounts now exposed
            // web3.eth.sendTransaction({/* ... */});
            resolve({ web3: 'enabled' });
        } catch (error) {
            // User denied account access...
            reject({ message: 'User denied account access' });
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        // web3.eth.sendTransaction({/* ... */});
        resolve({ web3: web3 });
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        reject({ message: 'No web3 detected' });
    }
  });
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  // window.addEventListener('load', function() {
  //   var results
  //   var web3 = window.web3
  //
  //   // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  //   if (typeof web3 !== 'undefined') {
  //     // Use Mist/MetaMask's provider.
  //     web3 = new Web3(web3.currentProvider)
  //
  //     results = {
  //       web3: web3
  //     }
  //
  //     console.log('Injected web3 detected.');
  //
  //     resolve(results)
  //   } else {
  //     // Fallback to localhost if no web3 injection. We've configured this to
  //     // use the development console's port by default.
  //     var provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545')
  //
  //     web3 = new Web3(provider)
  //
  //     results = {
  //       web3: web3
  //     }
  //
  //     console.log('No web3 instance injected, using Local web3.');
  //
  //     resolve(results)
  //   }
  // })
})

export default getWeb3
