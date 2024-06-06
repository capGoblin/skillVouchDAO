// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SkillVouchState.sol";

contract SkillVouchContract {
    SkillVouchState public immutable skillVouchState;
    uint256 constant DECIMAL = 10 ** 18;
    uint256 constant TOKENSTOUSERS = 50 * DECIMAL;
    uint256 constant TOKENSTOCONTRACT = 1000 * DECIMAL;
    uint256 constant INCENTIVEAMOUNT = 10 * DECIMAL;
    uint256 constant STAKEDAMOUNT = 20 * DECIMAL;

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
    event VoteCasted(uint256 requestId, address voter, bool acceptance);
    event RequestClosed(uint256 requestId, bool accepted);

    constructor(address _userRequestStructAddress) {
        skillVouchState = SkillVouchState(_userRequestStructAddress);
        skillVouchState.tokenContract().mintTo(address(this), TOKENSTOCONTRACT);
    }

    // USER_REQUEST

    function createRequest(
        string memory _skill,
        string memory _project,
        string memory _experience,
        uint256 _stakeAmount
    ) external payable {
        require(
            _stakeAmount > 20 * DECIMAL,
            "Stake amount must be greater than 20"
        );

        uint256 reqId = skillVouchState.add(
            msg.sender,
            new address[](0),
            _skill,
            _project,
            _experience,
            _stakeAmount
        );
        skillVouchState.tokenContract().transferFrom(
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
            !skillVouchState.checkAddress(msg.sender),
            "Already minted to this user"
        );
        skillVouchState.tokenContract().mintTo(msg.sender, TOKENSTOUSERS);
        skillVouchState.addUser(msg.sender);
    }

    function transitionRequestStatus(
        uint256 _requestId,
        uint8 _newStatus
    ) internal {
        require(
            skillVouchState.isRequestPresent(_requestId),
            "Request not found"
        );
        require(
            skillVouchState.get(_requestId).status != 2,
            "Request is closed"
        );

        skillVouchState.updateStatus(_requestId, _newStatus);
        emit RequestStatusChanged(_requestId, _newStatus);
    }

    // VOUCHING_PROCESS

    function vouchForSkill(uint256 _requestId) external {
        require(
            skillVouchState.get(_requestId).user != msg.sender,
            "Not fair man! you cannot vouch yourself"
        );
        require(
            skillVouchState.isRequestPresent(_requestId),
            "Request not found"
        );
        require(
            skillVouchState.get(_requestId).status == 0,
            "Request is not in Vouching Process"
        );
        require(
            !_hasVouchedOrVoted(
                skillVouchState.get(_requestId).vouched,
                msg.sender
            ),
            "Voucher has already vouched for this request"
        );

        skillVouchState.tokenContract().transferFrom(
            msg.sender,
            address(this),
            STAKEDAMOUNT
        );

        skillVouchState.addVoucher(_requestId, msg.sender);
        emit SkillVouched(_requestId, msg.sender, STAKEDAMOUNT);
    }

    function moveRequestToCommunityValidation(uint256 _requestId) external {
        require(
            skillVouchState.get(_requestId).user == msg.sender,
            "Other than request author cannot move request"
        );
        require(
            skillVouchState.get(_requestId).status == 0,
            "Request is not in Vouching Process phase"
        );

        transitionRequestStatus(_requestId, 1);
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
            skillVouchState.get(_requestId).user != msg.sender,
            "Not fair man! you cannot vote yourself"
        );
        require(
            skillVouchState.isRequestPresent(_requestId),
            "Request not found"
        );
        require(
            skillVouchState.get(_requestId).status == 1,
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
            skillVouchState.get(_requestId).user == msg.sender,
            "Other than request author cannot close request"
        );
        require(
            skillVouchState.isRequestPresent(_requestId),
            "Request not found"
        );
        require(
            skillVouchState.get(_requestId).status == 1,
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
        SkillVouchState.UserRequest memory request = skillVouchState.get(
            _requestId
        );

        skillVouchState.tokenContract().transferFrom(
            address(this),
            request.user,
            request.stakeAmountByUser + INCENTIVEAMOUNT
        );

        for (uint256 i = 0; i < request.vouched.length; i++) {
            address vouchor = request.vouched[i];
            skillVouchState.tokenContract().transferFrom(
                address(this),
                vouchor,
                STAKEDAMOUNT + INCENTIVEAMOUNT
            );
        }

        for (uint256 i = 0; i < voted[_requestId].length; i++) {
            address voter = voted[_requestId][i];
            skillVouchState.tokenContract().transferFrom(
                address(this),
                voter,
                INCENTIVEAMOUNT
            );
        }
    }

    function distributePenalties(uint256 _requestId) internal {
        SkillVouchState.UserRequest memory request = skillVouchState.get(
            _requestId
        );

        skillVouchState.tokenContract().burnFrom(
            address(this),
            request.stakeAmountByUser
        );

        for (uint256 i = 0; i < request.vouched.length; i++) {
            skillVouchState.tokenContract().burnFrom(
                address(this),
                STAKEDAMOUNT
            );
        }

        for (uint256 i = 0; i < voted[_requestId].length; i++) {
            address voter = voted[_requestId][i];
            skillVouchState.tokenContract().transferFrom(
                address(this),
                voter,
                INCENTIVEAMOUNT
            );
        }
    }

    function moveRequestToClosedPhase(uint256 _requestId) internal {
        require(
            skillVouchState.get(_requestId).status == 1,
            "Request is not in Community Validation phase"
        );

        transitionRequestStatus(_requestId, 2);
    }
}
