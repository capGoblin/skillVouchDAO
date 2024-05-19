// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./UserRequestContract.sol";
import "./UserRequestStruct.sol";

contract VouchingProcessContract {
    UserRequestContract userRequestContract; 
    UserRequestStruct userRequestStruct;

    uint256 stakedAmount = 20;
    uint256 public vouchingTimeLimit;

    mapping(uint256 => mapping(address => bool)) public vouched;
    mapping(uint256 => uint256) public vouchedCount;

    event SkillVouched(uint256 requestId, address vouchor, uint256 stakedAmount);
    event RequestMovedToCommunityValidation(uint256 requestId);

    constructor(address _userRequestContractAddress, address _userRequestStructAddress) {
        userRequestContract = UserRequestContract(_userRequestContractAddress);
        userRequestStruct = UserRequestStruct(_userRequestStructAddress);
    }
    

    function vouchForSkill(uint256 _requestId) external {
        require(userRequestStruct.isRequestPresent(_requestId), "Request not found");
        require(userRequestStruct.get(_requestId).status == 0, "Request is not in Vouching Process");
        require(!_hasVouched(userRequestStruct.get(_requestId).vouched, msg.sender), "Voucher has already vouched for this request");
        
        userRequestStruct.tokenContract().transferFrom(msg.sender, address(userRequestContract), stakedAmount);

        userRequestStruct.addVoucher(_requestId, msg.sender);
        emit SkillVouched(_requestId, msg.sender, stakedAmount);
    }


    function moveRequestToCommunityValidation(uint256 _requestId) external {
        require(userRequestStruct.get(_requestId).status == 0, "Request is not in Vouching Process phase");

        userRequestContract.transitionRequestStatus(_requestId, 1);
        emit RequestMovedToCommunityValidation(_requestId);
    }


    function _hasVouched(address[] memory vouchedAddresses, address vouchor) internal pure returns (bool) {
        for (uint i = 0; i < vouchedAddresses.length; i++) {
            if (vouchedAddresses[i] == vouchor) {
                return true;
            }
        }
        return false;
    }
}
