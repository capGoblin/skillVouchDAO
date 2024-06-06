import { gql } from "@apollo/client";

export const GET_REQ_BY_USER = gql`
  query GetRequestsByUser($userAddress: String!) {
    requestCreateds(where: { user: $userAddress }) {
      id
      requestId
      user
      skill
      experience
      project
      stakeAmount
      linkedInLink
      gitHubLink
    }
  }
`;

export const GET_REQS = gql`
  {
    requestCreateds {
      id
      requestId
      user
      skill
      experience
      project
      linkedInLink
      gitHubLink
    }
  }
`;

export const GET_VOUCHED = gql`
  query GetVouched($id: BigInt!) {
    skillVoucheds(where: { requestId: $id }) {
      vouchor
    }
  }
`;
export const GET_VOTES = gql`
  query GetVotes($id: BigInt!) {
    voteCasteds(where: { requestId: $id }) {
      requestId
      acceptance
    }
  }
`;

export const GET_ACCEPTED = gql`
  query GetAcceptedReqs($id: BigInt!) {
    requestCloseds(where: { requestId: $id, accepted: true }) {
      requestId
    }
  }
`;

export const GET_CLOSED = gql`
  query GetClosedReqs($id: BigInt!) {
    requestCloseds(where: { requestId: $id }) {
      requestId
    }
  }
`;
