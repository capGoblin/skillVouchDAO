// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import "./TokenContract.sol";
import "./UserRequestStruct.sol";

contract UserRequestContract is UserRequestStruct {
    mapping(address => uint256[]) public userToRequests; 
    uint256 public nextRequestId;

    event RequestCreated(uint256 requestId, address user, string skill, string project, string experience, uint256 stakeAmount, RequestStatus status);
    event RequestStatusChanged(uint256 requestId, RequestStatus status);

    constructor() {
        nextRequestId = 1;
    }

    function createRequest(string memory _skill, string memory _project, string memory _experience, uint256 _stakeAmount) external {
        require(_stakeAmount > 0, "Stake amount must be greater than 0");

        UserRequestStruct.userRequests[nextRequestId] = UserRequestStruct.UserRequest({
            user: msg.sender,
            vouched: new address[](0),
            vouchedCount: 0,
            skill: _skill,
            project: _project,
            experience: _experience,
            stakeAmountByUser: _stakeAmount,
            status: UserRequestStruct.RequestStatus.VouchingProcess,
            creationTime: block.timestamp 
        });

        
        userToRequests[msg.sender].push(nextRequestId);


        UserRequestStruct.tokenContract.transferFrom(msg.sender, address(this), _stakeAmount);
        
        emit RequestCreated(nextRequestId, msg.sender, _skill, _project, _experience, _stakeAmount, RequestStatus.VouchingProcess);
        nextRequestId++;
    }

    function transitionRequestStatus(uint256 _requestId, RequestStatus _newStatus) external {
        require(_newStatus != RequestStatus.Pending, "Cannot transition to Pending status");
        require(userRequests[_requestId].status != RequestStatus.Closed, "Request is closed");

        userRequests[_requestId].status = _newStatus;
        emit RequestStatusChanged(_requestId, _newStatus);
    }
}
