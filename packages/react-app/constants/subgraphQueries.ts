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
