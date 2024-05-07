// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./TokenContract.sol";
import "./UserRequestContract.sol";
import "./UserRequestStruct.sol";

contract VouchingProcessContract is UserRequestStruct {
    // TokenContract tokenContract = new TokenContract();
    UserRequestContract userRequestContract = new UserRequestContract();

    uint256 stakedAmount = 19;
    uint256 public vouchingTimeLimit;

    mapping(uint256 => mapping(address => bool)) public vouched;
    mapping(uint256 => uint256) public vouchedCount;

    event SkillVouched(uint256 requestId, address vouchor, uint256 stakedAmount);
    event RequestMovedToCommunityValidation(uint256 requestId);

    constructor(uint256 _vouchingTimeLimit) {
        // tokenContract = TokenContract(_tokenContractAddress);
        // userRequestContract = UserRequestContract(_userRequestContractAddress);
        vouchingTimeLimit = _vouchingTimeLimit;
    }

    function vouchForSkill(uint256 _requestId) external {
        // UserRequestStruct.UserRequest memory ur = UserRequestStruct.userRequests[_requestId];

        require(UserRequestStruct.userRequests[_requestId].status == UserRequestStruct.RequestStatus.VouchingProcess, "Request is not in Vouching Process phase");
        require(!_hasVouched(UserRequestStruct.userRequests[_requestId].vouched, msg.sender), "Voucher has already vouched for this request");

        
        UserRequestStruct.tokenContract.transferFrom(msg.sender, address(userRequestContract), stakedAmount);

        UserRequestStruct.userRequests[_requestId].vouched.push(msg.sender);
        UserRequestStruct.userRequests[_requestId].vouchedCount++;
        emit SkillVouched(_requestId, msg.sender, stakedAmount);
    }


    function moveRequestToCommunityValidation(uint256 _requestId) external {
        require(UserRequestStruct.userRequests[_requestId].status == UserRequestStruct.RequestStatus.VouchingProcess, "Request is not in Vouching Process phase");
        require(block.timestamp >= UserRequestStruct.userRequests[_requestId].creationTime + vouchingTimeLimit, "Vouching time limit not reached");

        userRequestContract.transitionRequestStatus(_requestId, UserRequestStruct.RequestStatus.CommunityValidation);
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
