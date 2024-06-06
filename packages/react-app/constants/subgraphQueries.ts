import { gql } from "@apollo/client";

const GET_REQ_BY_USER = gql`
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
export default GET_REQ_BY_USER;
