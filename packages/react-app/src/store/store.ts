import create from "zustand";

enum Stage {
  UserProfile,
  SkillVouchRequest,
  VouchingProcess,
  CommunityValidation,
}
interface BaseProfile {
  requestId: number;
  skills: string;
  POW: string;
  selectedPOW: string;
  linkedin: string;
  github: string;
}

interface SkillVouchRequest extends BaseProfile {}

interface VouchingProcess extends BaseProfile {
  NoOfVouched: number;
}

interface CommunityValidation extends VouchingProcess {
  NoOfYesVotes: number;
  NoOfNoVotes: number;
}

interface State {
  stage: Stage | undefined;
  setStage: (stage: Stage) => void;
  stageOneInputs: SkillVouchRequest[];
  setStageOneInputs: (inputs: SkillVouchRequest[]) => void;
  stageTwoInputs: VouchingProcess[];
  setStageTwoInputs: (inputs: VouchingProcess[]) => void;
  stageThreeInputs: CommunityValidation[];
  setStageThreeInputs: (inputs: CommunityValidation[]) => void;
  contract: any;
  setContract: (contract: any) => void;
  provider: any;
  setProvider: (provider: any) => void;
  signer: any;
  setSigner: (signer: any) => void;
}

export const useStore = create<State>((set) => ({
  stage: Stage.UserProfile,
  setStage: (stage) => set({ stage }),
  stageOneInputs: [],
  setStageOneInputs: (inputs) => set({ stageOneInputs: inputs }),
  stageTwoInputs: [],
  setStageTwoInputs: (inputs) => set({ stageTwoInputs: inputs }),
  stageThreeInputs: [],
  setStageThreeInputs: (inputs) => set({ stageThreeInputs: inputs }),
  contract: null,
  setContract: (contract) => set({ contract }),
  provider: null,
  setProvider: (provider) => set({ provider }),
  signer: null,
  setSigner: (signer) => set({ signer }),
}));
