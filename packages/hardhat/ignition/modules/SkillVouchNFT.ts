import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("SkillVouchNFT", (m) => {
  const skillVouchNFT = m.contract("SkillVouchNFT", []);
  return {
    skillVouchNFT,
  };
});
