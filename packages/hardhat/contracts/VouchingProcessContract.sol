// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./TokenContract.sol";
import "./UserRequestContract.sol";

contract VouchingProcessContract {
    TokenContract public tokenContract;
    UserRequestContract public userRequestContract;

    uint256 stakedAmount = 19;
    uint256 public vouchingTimeLimit;

    // mapping(uint256 => mapping(address => bool)) public vouched;
    // mapping(uint256 => uint256) public vouchedCount;

    event SkillVouched(uint256 requestId, address vouchor, uint256 stakedAmount);
    event RequestMovedToCommunityValidation(uint256 requestId);

    constructor(address _tokenContractAddress, address _userRequestContractAddress, uint256 _vouchingTimeLimit) {
        tokenContract = TokenContract(_tokenContractAddress);
        userRequestContract = UserRequestContract(_userRequestContractAddress);
        vouchingTimeLimit = _vouchingTimeLimit;
    }

    function vouchForSkill(uint256 _requestId) external {
        require(userRequestContract.userRequests(_requestId).status == UserRequestContract.RequestStatus.VouchingProcess, "Request is not in Vouching Process phase");
        require(!_hasVouched(userRequestContract.userRequests(_requestId).vouched, msg.sender), "Voucher has already vouched for this request");

        
        tokenContract.transferFrom(msg.sender, address(userRequestContract), stakedAmount);

        userRequestContract.userRequests(_requestId).vouched.push(msg.sender);
        userRequestContract.userRequests(_requestId).vouchedCount++;
        emit SkillVouched(_requestId, msg.sender, stakedAmount);
    }


    function moveRequestToCommunityValidation(uint256 _requestId) external {
        require(userRequestContract.userRequests(_requestId).status == UserRequestContract.RequestStatus.VouchingProcess, "Request is not in Vouching Process phase");
        require(block.timestamp >= userRequestContract.userRequests(_requestId).creationTime + vouchingTimeLimit, "Vouching time limit not reached");

        userRequestContract.transitionRequestStatus(_requestId, UserRequestContract.RequestStatus.CommunityValidation);
        emit RequestMovedToCommunityValidation(_requestId);
    }


    function _hasVouched(address[] vouchedAddresses, address vouchor) internal pure returns (bool) {
        for (uint i = 0; i < vouchedAddresses.length; i++) {
            if (vouchedAddresses[i] == vouchor) {
                return true;
            }
        }
        return false;
    }
}
