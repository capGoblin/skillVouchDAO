// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./TokenContract.sol";
import "./UserRequestContract.sol";

contract CommunityValidationContract {
    TokenContract public tokenContract;
    UserRequestContract public userRequestContract;

    mapping(uint256 => mapping(address => bool)) public voted;
    mapping(uint256 => uint256) public acceptVotes;
    mapping(uint256 => uint256) public rejectVotes;

    uint256 public votingTimeLimit;
    uint256 public issueVotingTimeLimit;

    event VoteCasted(uint256 requestId, address voter, bool acceptance);
    event RequestClosed(uint256 requestId, bool accepted);

    constructor(address _tokenContractAddress, address _userRequestContractAddress, uint256 _votingTimeLimit) {
        tokenContract = TokenContract(_tokenContractAddress);
        userRequestContract = UserRequestContract(_userRequestContractAddress);
        votingTimeLimit = _votingTimeLimit;
        issueVotingTimeLimit = _votingTimeLimit / 2;
    }

    function castVote(uint256 _requestId, bool _acceptance) external {
        require(userRequestContract.userRequests(_requestId).status == UserRequestContract.RequestStatus.CommunityValidation, "Request is not in Community Validation phase");
        require(!voted[_requestId][msg.sender], "Voter has already casted vote for this request");

        if (_acceptance) {
            acceptVotes[_requestId]++;
        } else {
            rejectVotes[_requestId]++;
        }
        voted[_requestId][msg.sender] = true;
        emit VoteCasted(_requestId, msg.sender, _acceptance);
    }

    function closeRequest(uint256 _requestId) external {
        require(userRequestContract.userRequests(_requestId).status == UserRequestContract.RequestStatus.CommunityValidation, "Request is not in Community Validation phase");
        require(block.timestamp >= userRequestContract.userRequests(_requestId).creationTime + votingTimeLimit, "Voting time limit not reached");

        if (acceptVotes[_requestId] > rejectVotes[_requestId]) {
            distributeRewards(_requestId);
            emit RequestClosed(_requestId, true);
        } else {
            distributePenalties(_requestId);
            emit RequestClosed(_requestId, false);
        }
        userRequestContract.transitionRequestStatus(_requestId, UserRequestContract.RequestStatus.Closed);
    }

    function distributeRewards(uint256 _requestId) internal {
        UserRequest request = userRequestContract.userRequests(_requestId);

        tokenContract.transfer(request.user, request.stakeAmountByUser);

        for (uint256 i = 0; i < request.vouched.length; i++) {
            address vouchor = request.vouched[i];
            tokenContract.transfer(vouchor, request.stakeAmountByVouchers[vouchor]);
        }

    }

    function distributePenalties(uint256 _requestId) internal {
        UserRequest request = userRequestContract.userRequests(_requestId);

        tokenContract.transfer(address(0), request.stakeAmountByUser);

        for (uint256 i = 0; i < request.vouched.length; i++) {
            address vouchor = request.vouched[i];
            tokenContract.transfer(address(0), request.stakeAmountByVouchers[vouchor]);
        }

    }

}
