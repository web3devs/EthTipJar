pragma solidity ^0.4.18;

contract EthTipJar {
    address public myAddress = this;
    address public owner;
    address constant public web3devs = 0x8A45C193e7Cd5c485534f82f4Ce6657EFc973faB;

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
