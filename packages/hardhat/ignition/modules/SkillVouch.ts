import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("SkillVouch", (m) => {
  const tokenContract = m.contract("TokenContract", []);
  const skillVouchState = m.contract("SkillVouchState", [tokenContract]);
  const skillVouchContract = m.contract("SkillVouchContract", [
    skillVouchState,
  ]);

  return {
    tokenContract,
    skillVouchState,
    skillVouchContract,
  };
});
