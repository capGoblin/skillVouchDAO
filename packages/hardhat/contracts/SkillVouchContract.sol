// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./UserRequestStruct.sol";

contract SkillVouchContract {
    UserRequestStruct userRequestStruct;

    mapping(address => uint256[]) public userToRequests;

    uint256 constant TOKENSTOUSERS = 50;
    uint256 constant TOKENSTOCONTRACT = 1000;
    uint256 constant INCENTIVEAMOUNT = 10;

    uint256 constant stakedAmount = 20;
    uint256 public vouchingTimeLimit;

    mapping(uint256 => address[]) public voted;
    mapping(uint256 => uint256) public acceptVotes;
    mapping(uint256 => uint256) public rejectVotes;

    event RequestCreated(
        uint256 requestId,
        address user,
        string skill,
        string project,
        string experience,
        uint256 stakeAmount
    );
    event RequestStatusChanged(uint256 requestId, uint8 _newStatus);

    event SkillVouched(
        uint256 requestId,
        address vouchor,
        uint256 stakedAmount
    );
    event RequestMovedToCommunityValidation(uint256 requestId);

    event VoteCasted(uint256 requestId, address voter, bool acceptance);
    event RequestClosed(uint256 requestId, bool accepted);
    event RequestMovedToClosedPhase(uint256 requestId);

    constructor(address _userRequestStructAddress) {
        userRequestStruct = UserRequestStruct(_userRequestStructAddress);
        userRequestStruct.tokenContract().mintTo(
            address(this),
            TOKENSTOCONTRACT
        );
    }

    // USER_REQUEST

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
        userRequestStruct.tokenContract().mintTo(msg.sender, TOKENSTOUSERS);
        userRequestStruct.addUser(msg.sender);
    }

    function transitionRequestStatus(
        uint256 _requestId,
        uint8 _newStatus
    ) internal {
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

    // VOUCHING_PROCESS

    function vouchForSkill(uint256 _requestId) external {
        require(
            userRequestStruct.isRequestPresent(_requestId),
            "Request not found"
        );
        require(
            userRequestStruct.get(_requestId).status == 0,
            "Request is not in Vouching Process"
        );
        require(
            !_hasVouchedOrVoted(
                userRequestStruct.get(_requestId).vouched,
                msg.sender
            ),
            "Voucher has already vouched for this request"
        );

        userRequestStruct.tokenContract().transferFrom(
            msg.sender,
            address(this),
            stakedAmount
        );

        userRequestStruct.addVoucher(_requestId, msg.sender);
        emit SkillVouched(_requestId, msg.sender, stakedAmount);
    }

    function moveRequestToCommunityValidation(uint256 _requestId) external {
        require(
            userRequestStruct.get(_requestId).status == 0,
            "Request is not in Vouching Process phase"
        );

        transitionRequestStatus(_requestId, 1);
        emit RequestMovedToCommunityValidation(_requestId);
    }

    function _hasVouchedOrVoted(
        address[] memory vouchedAddresses,
        address vouchor
    ) internal pure returns (bool) {
        for (uint i = 0; i < vouchedAddresses.length; i++) {
            if (vouchedAddresses[i] == vouchor) {
                return true;
            }
        }
        return false;
    }

    // COMMUNITY_VALIDATION

    function castVote(uint256 _requestId, bool _acceptance) external {
        require(
            userRequestStruct.isRequestPresent(_requestId),
            "Request not found"
        );
        require(
            userRequestStruct.get(_requestId).status == 1,
            "Request is not in Community Validation phase"
        );
        require(
            !_hasVouchedOrVoted(voted[_requestId], msg.sender),
            "Voter has already casted vote for this request"
        );

        if (_acceptance) {
            acceptVotes[_requestId]++;
        } else {
            rejectVotes[_requestId]++;
        }

        voted[_requestId].push(msg.sender);
        emit VoteCasted(_requestId, msg.sender, _acceptance);
    }

    function closeRequest(uint256 _requestId) external {
        require(
            userRequestStruct.isRequestPresent(_requestId),
            "Request not found"
        );
        require(
            userRequestStruct.get(_requestId).status == 1,
            "Request is not in Community Validation phase"
        );

        if (acceptVotes[_requestId] > rejectVotes[_requestId]) {
            distributeRewards(_requestId);
            emit RequestClosed(_requestId, true);
        } else {
            distributePenalties(_requestId);
            emit RequestClosed(_requestId, false);
        }

        moveRequestToClosedPhase(_requestId);
    }

    function distributeRewards(uint256 _requestId) internal {
        UserRequestStruct.UserRequest memory request = userRequestStruct.get(
            _requestId
        );

        userRequestStruct.tokenContract().transferFrom(
            address(this),
            request.user,
            request.stakeAmountByUser + INCENTIVEAMOUNT
        );

        for (uint256 i = 0; i < request.vouched.length; i++) {
            address vouchor = request.vouched[i];
            userRequestStruct.tokenContract().transferFrom(
                address(this),
                vouchor,
                stakedAmount + INCENTIVEAMOUNT
            );
        }

        for (uint256 i = 0; i < voted[_requestId].length; i++) {
            address voter = voted[_requestId][i];
            userRequestStruct.tokenContract().transferFrom(
                address(this),
                voter,
                INCENTIVEAMOUNT
            );
        }
    }

    function distributePenalties(uint256 _requestId) internal {
        UserRequestStruct.UserRequest memory request = userRequestStruct.get(
            _requestId
        );

        userRequestStruct.tokenContract().burnFrom(
            address(this),
            request.stakeAmountByUser
        );

        for (uint256 i = 0; i < request.vouched.length; i++) {
            userRequestStruct.tokenContract().burnFrom(
                address(this),
                stakedAmount
            );
        }

        for (uint256 i = 0; i < voted[_requestId].length; i++) {
            address voter = voted[_requestId][i];
            userRequestStruct.tokenContract().transferFrom(
                address(this),
                voter,
                INCENTIVEAMOUNT
            );
        }
    }

    function moveRequestToClosedPhase(uint256 _requestId) internal {
        require(
            userRequestStruct.get(_requestId).status == 1,
            "Request is not in Community Validation phase"
        );

        transitionRequestStatus(_requestId, 2);
        emit RequestMovedToClosedPhase(_requestId);
    }
}