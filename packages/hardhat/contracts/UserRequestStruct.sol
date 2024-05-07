// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./TokenContract.sol";
contract UserRequestStruct {
    enum RequestStatus { Pending, VouchingProcess, CommunityValidation, Closed }

    TokenContract public tokenContract = TokenContract(0xaE036c65C649172b43ef7156b009c6221B596B8b);

    struct UserRequest {
        address user;
        address[] vouched;
        uint256 vouchedCount;
        string skill;
        string project;
        string experience;
        uint256 stakeAmountByUser;
            // mapping(address => uint256) stakeAmountByVouchers;
        RequestStatus status;
        uint256 creationTime;
    }
    mapping(uint256 => UserRequest) public userRequests;



}