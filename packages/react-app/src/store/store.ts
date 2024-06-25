import create from "zustand";

export enum Stage {
  HomePage,
  UserProfile,
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
  linkedInLink: string;
  setLinkedInLink: (value: string) => void;
  githubLink: string;
  setGithubLink: (value: string) => void;
}

export const useStore = create<State>((set) => ({
  stage: Stage.HomePage,
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
  linkedInLink: "",
  setLinkedInLink: (value: string) => set(() => ({ linkedInLink: value })),
  githubLink: "",
  setGithubLink: (value: string) => set(() => ({ githubLink: value })),
}));
