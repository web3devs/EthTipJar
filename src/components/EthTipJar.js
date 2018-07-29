import React, { Component } from 'react';

let deployContract = require('./DeployContract');
import getWeb3 from '../utils/getWeb3';

let ETJAbi = require('../../abis/EthTipJarAbi.js');
let ETJAddress = require('../../ETJAddress/ETJAddress.js');
// let ETJ = web3.eth.contract(ETJAbi).at(ETJAddress);

class EthTipJar extends Component{
  constructor(props){
    super(props);
    this.state = {
      web3: null,
      ETJ: null,
      value: 0
    }
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleTextChange=this.handleTextChange.bind(this);
    this.initializeContract=this.initializeContract.bind(this);
  }

  componentWillMount() {
  /** Get network provider and web3 instance.
   See utils/getWeb3 for more info. */
  getWeb3
  .then(results => {
    // console.log('results: ', results);
    this.setState({
      web3: results.web3,
      ETJ: results.web3.eth.contract(ETJAbi).at(ETJAddress)
    })
  })
  .catch(error => {
    // console.log(error)
    this.setState({
      web3error: error.error
    })
  })
  // this.accountListener()
}

  handleTextChange = (event) => {
    if(this.state[event.target.id] !== undefined){
      this.setState({[event.target.id]: event.target.value});
    }
  }

  initializeContract = (event) => {
    event.preventDefault();
    console.log("initializeContract fired");
    deployContract();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("tip fired!");
    this.state.ETJ.tip({
      from: this.state.web3.eth.accounts[0],
      gas: 300000,
      value: this.state.value*10**18},
      (err,res)=>{
        if(err){
          console.log("there is an error with the callback");
          console.log(err);
        } else {
          console.log("success!");
          console.log(res);
        }
      }
    );
    console.log("ETJ.tip fired!");
  }

  render() {
    const labelStyle={
      marginRight: "10px",
      paddingRight: "10px",
      letterSpacing: "0.1em"
    }

    if(document.getElementById('ethtipjar-contract-address-field') !== null){
      return (
        <div className="EthTipJar">
          <fieldset>
           <form>
              <input id="submit" type="submit" value="Initialize EthTipJar" onClick={this.initializeContract}/>
            </form>
          </fieldset>
        </div>
      );
    } else {
      return (
        <div className="EthTipJar">
          <fieldset>
            <form>
              <label style={labelStyle}>ETH:</label>
              <input id="value" type="text" onChange={this.handleTextChange} value={this.state.value} />
              <hr/>
              <input id="submit" type="submit" value="Send Tip" onClick={this.handleSubmit}/>
            </form>
          </fieldset>
        </div>
      );
    }
  }
}

export default EthTipJar
