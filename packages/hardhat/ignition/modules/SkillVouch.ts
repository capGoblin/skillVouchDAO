import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("SkillVouch", (m) => {
  const tokenContract = m.contract("TokenContract", []);
  const userRequestStruct = m.contract("UserRequestStruct", [tokenContract]);
  const userRequestContract = m.contract("UserRequestContract", [
    userRequestStruct,
  ]);
  const vouchingProcessContract = m.contract("VouchingProcessContract", [
    userRequestContract,
    userRequestStruct,
  ]);
  const communityValidationContract = m.contract(
    "CommunityValidationContract",
    [userRequestContract, userRequestStruct]
  );

  return {
    tokenContract,
    userRequestStruct,
    userRequestContract,
    vouchingProcessContract,
    communityValidationContract,
  };
});
