// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./UserRequestStruct.sol";

contract UserRequestContract {
    UserRequestStruct userRequestStruct;

    mapping(address => uint256[]) public userToRequests;

    uint256 constant TOKENSTOMINT = 50;

    event RequestCreated(
        uint256 requestId,
        address user,
        string skill,
        string project,
        string experience,
        uint256 stakeAmount
    );
    event RequestStatusChanged(uint256 requestId, uint8 _newStatus);

    constructor(address _userRequestStructAddress) {
        userRequestStruct = UserRequestStruct(_userRequestStructAddress);
    }

    function createRequest(
        string memory _skill,
        string memory _project,
        string memory _experience,
        uint256 _stakeAmount
    ) external payable {
        require(_stakeAmount > 20, "Stake amount must be greater than 20");

        uint256 reqId = userRequestStruct.add(
            msg.sender,
            new address[](0),
            0,
            _skill,
            _project,
            _experience,
            _stakeAmount,
            block.timestamp
        );
        userRequestStruct.tokenContract().transferFrom(
            msg.sender,
            address(this),
            _stakeAmount
        );

        emit RequestCreated(
            reqId,
            msg.sender,
            _skill,
            _project,
            _experience,
            _stakeAmount
        );
    }

    function mintTokensToNewUsers() external {
        require(
            !userRequestStruct.checkAddress(msg.sender),
            "Already minted to this user"
        );
        userRequestStruct.tokenContract().mintToNewUsers(
            msg.sender,
            TOKENSTOMINT
        );
        userRequestStruct.addUser(msg.sender);
    }

    function transitionRequestStatus(
        uint256 _requestId,
        uint8 _newStatus
    ) external {
        require(
            userRequestStruct.isRequestPresent(_requestId),
            "Request not found"
        );
        require(
            userRequestStruct.get(_requestId).status != 2,
            "Request is closed"
        );

        userRequestStruct.updateStatus(_requestId, _newStatus);
        emit RequestStatusChanged(_requestId, _newStatus);
    }
}
