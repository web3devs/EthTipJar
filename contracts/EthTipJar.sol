pragma solidity ^0.4.18;

contract EthTipJar {
    address public myAddress = this;
    address public owner;
    address constant public web3devs = 0x5AEDA56215b167893e80B4fE645BA6d5Bab767DE;

    constructor () public payable {
        owner = msg.sender;
    }

    function () payable public {
        uint amount = msg.value;
        uint royalty = amount / 200;
        web3devs.transfer(royalty);
        owner.transfer(address(this).balance);
    }

    function tip () payable public returns (bool){
        uint amount = msg.value;
        uint royalty = amount / 200;
        web3devs.transfer(royalty);
        owner.transfer(address(this).balance);
        return true;
    }
}
