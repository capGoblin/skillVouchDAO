// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// import "./UserRequestContract.sol";
// import "./UserRequestStruct.sol";

// contract CommunityValidationContract {
//     UserRequestContract userRequestContract;
//     UserRequestStruct userRequestStruct;

//     mapping(uint256 => mapping(address => bool)) public voted;
//     mapping(uint256 => uint256) public acceptVotes;
//     mapping(uint256 => uint256) public rejectVotes;

//     uint256 public votingTimeLimit;
//     uint256 public issueVotingTimeLimit;
//     uint256 stakedAmount = 20;

//     event VoteCasted(uint256 requestId, address voter, bool acceptance);
//     event RequestClosed(uint256 requestId, bool accepted);
//     event RequestMovedToClosedPhase(uint256 requestId);

//     constructor(
//         address _userRequestContractAddress,
//         address _userRequestStructAddress
//     ) {
//         userRequestContract = UserRequestContract(_userRequestContractAddress);
//         userRequestStruct = UserRequestStruct(_userRequestStructAddress);
//     }

//     function castVote(uint256 _requestId, bool _acceptance) external {
//         require(
//             userRequestStruct.isRequestPresent(_requestId),
//             "Request not found"
//         );
//         require(
//             userRequestStruct.get(_requestId).status == 1,
//             "Request is not in Community Validation phase"
//         );
//         require(
//             !voted[_requestId][msg.sender],
//             "Voter has already casted vote for this request"
//         );

//         if (_acceptance) {
//             acceptVotes[_requestId]++;
//         } else {
//             rejectVotes[_requestId]++;
//         }
//         voted[_requestId][msg.sender] = true;
//         emit VoteCasted(_requestId, msg.sender, _acceptance);
//     }

//     function closeRequest(uint256 _requestId) external {
//         require(
//             userRequestStruct.isRequestPresent(_requestId),
//             "Request not found"
//         );
//         require(
//             userRequestStruct.get(_requestId).status == 1,
//             "Request is not in Community Validation phase"
//         );

//         if (acceptVotes[_requestId] > rejectVotes[_requestId]) {
//             distributeRewards(_requestId);
//             emit RequestClosed(_requestId, true);
//         } else {
//             distributePenalties(_requestId);
//             emit RequestClosed(_requestId, false);
//         }

//         userRequestContract.transitionRequestStatus(_requestId, 2);
//     }

//     function distributeRewards(uint256 _requestId) internal {
//         UserRequestStruct.UserRequest memory request = userRequestStruct.get(
//             _requestId
//         );

//         userRequestStruct.tokenContract().transferFrom(
//             address(userRequestContract),
//             request.user,
//             request.stakeAmountByUser
//         );

//         for (uint256 i = 0; i < request.vouched.length; i++) {
//             address vouchor = request.vouched[i];
//             userRequestStruct.tokenContract().transferFrom(
//                 address(userRequestContract),
//                 vouchor,
//                 stakedAmount
//             );
//         }
//     }

//     function distributePenalties(uint256 _requestId) internal {
//         UserRequestStruct.UserRequest memory request = userRequestStruct.get(
//             _requestId
//         );

//         userRequestStruct.tokenContract().burnFrom(
//             address(userRequestContract),
//             request.stakeAmountByUser
//         );

//         for (uint256 i = 0; i < request.vouched.length; i++) {
//             userRequestStruct.tokenContract().burnFrom(
//                 address(userRequestContract),
//                 stakedAmount
//             );
//         }
//     }

//     function moveRequestToClosedPhase(uint256 _requestId) external {
//         require(
//             userRequestStruct.get(_requestId).status == 1,
//             "Request is not in Community Validation phase"
//         );

//         userRequestContract.transitionRequestStatus(_requestId, 2);
//         emit RequestMovedToClosedPhase(_requestId);
//     }
// }
