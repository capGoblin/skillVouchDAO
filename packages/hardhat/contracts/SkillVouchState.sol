// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./TokenContract.sol";

contract SkillVouchState {
    TokenContract public immutable tokenContract;

    struct UserRequest {
        address user;
        address[] vouched;
        string skill;
        string project;
        string experience;
        uint256 stakeAmountByUser;
        uint256 status;
        string linkedInLink;
        string gitHubLink;
        // uint256 creationTime;
    }

    mapping(uint256 => UserRequest) public userRequests;
    mapping(address => uint256[]) public userToRequests;
    mapping(address => bool) public users;

    uint256 public nextRequestId;

    // address[] public users;

    constructor(address _tokenContractAddress) {
        nextRequestId = 1;
        tokenContract = TokenContract(_tokenContractAddress);
    }

    function add(
        address _user,
        address[] memory _vouched,
        string memory _skill,
        string memory _project,
        string memory _experience,
        uint256 _stakeAmountByUser,
        string memory _linkedInLink,
        string memory _gitHubLink
    )
        external
        returns (
            // uint256 _creationTime
            uint256 requestId
        )
    {
        requestId = nextRequestId;
        UserRequest memory newUserRequest = UserRequest({
            user: _user,
            vouched: _vouched,
            skill: _skill,
            project: _project,
            experience: _experience,
            stakeAmountByUser: _stakeAmountByUser,
            status: 0,
            linkedInLink: _linkedInLink,
            gitHubLink: _gitHubLink
            // creationTime: _creationTime
        });
        userRequests[requestId] = newUserRequest;

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
        UserRequest storage request = userRequests[_requestId];
        request.vouched.push(voucher);
    }

    function updateStatus(uint256 requestId, uint256 newStatus) external {
        userRequests[requestId].status = newStatus;
    }

    function checkAddress(address _addressToFind) public view returns (bool) {
        return users[_addressToFind];
    }

    function addUser(address user) external {
        if (!users[user]) {
            users[user] = true;
        }
    }
}
