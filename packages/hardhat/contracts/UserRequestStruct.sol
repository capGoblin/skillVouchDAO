// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./TokenContract.sol";
pragma solidity ^0.8.0;

contract UserRequestStruct {
    TokenContract public tokenContract;

    struct UserRequest {
        address user;
        address[] vouched;
        uint256 vouchedCount;
        string skill;
        string project;
        string experience;
        uint256 stakeAmountByUser;
        uint256 status;
        uint256 creationTime;
    }

    mapping(uint256 => UserRequest) public userRequests;
    mapping(address => uint256[]) public userToRequests; 

    uint256 public nextRequestId;

    constructor(address _tokenContractAddress) {
        nextRequestId = 1;
        tokenContract = TokenContract(_tokenContractAddress);
    }

    function add(
        address _user,
        address[] memory _vouched,
        uint256 _vouchedCount,
        string memory _skill,
        string memory _project,
        string memory _experience,
        uint256 _stakeAmountByUser,
        uint256 _creationTime
    ) external returns (uint256 requestId) {
        requestId = nextRequestId;
        userRequests[requestId] = UserRequest({
            user: _user,
            vouched: _vouched,
            vouchedCount: _vouchedCount,
            skill: _skill,
            project: _project,
            experience: _experience,
            stakeAmountByUser: _stakeAmountByUser,
            status: 0,
            creationTime: _creationTime
        });

        userToRequests[_user].push(requestId);

        nextRequestId++;

        return requestId;
    }


    function get(uint256 requestId) external view returns (UserRequest memory) {
        return userRequests[requestId];
    }

    function isRequestPresent(uint256 requestId) external view returns (bool) {
        return userRequests[requestId].user != address(0);
    }

    function addVoucher(uint256 _requestId, address voucher) external {
        userRequests[_requestId].vouched.push(voucher);
        userRequests[_requestId].vouchedCount++;
    }
}
