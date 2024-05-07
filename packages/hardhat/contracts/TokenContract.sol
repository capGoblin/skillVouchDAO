// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenContract is ERC20 {
    address public owner;

    constructor() ERC20("SkillVouch Token", "SVT")
 {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function mint(uint256 amount) external onlyOwner {
        _mint(msg.sender, amount);
    }

    function burn(address account, uint256 amount) external onlyOwner {
        _burn(account, amount);
    }

    function transfer(address recipient, uint256 amount) public override returns (bool) {
        // require(recipient != address(0), "Transfer to zero address");
        return super.transfer(recipient, amount);
    }

    // function transferFrom(address sender, address recipient, uint256 amount) public override returns (bool) {
    //     // require(recipient != address(0), "Transfer to zero address");
    //     return super.transferFrom(sender, recipient, amount);
    // }

    function transferFrom(address sender, address recipient, uint256 amount) public override returns (bool) {
        // require(recipient != address(0), "Transfer to zero address");
        _transfer(sender, recipient, amount);
        return true;
    }

}
