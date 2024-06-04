import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("SkillVouch", (m) => {
  const tokenContract = m.contract("TokenContract", []);
  const userRequestStruct = m.contract("UserRequestStruct", [tokenContract]);
  const skillVouchContract = m.contract("SkillVouchContract", [
    userRequestStruct,
  ]);

  return {
    tokenContract,
    userRequestStruct,
    skillVouchContract,
  };
});
