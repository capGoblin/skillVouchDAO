import { useStore } from "../store/store";
import CommunityValidation from "./CommunityValidation";
import SkillVouchRequest from "./SkillVouchRequest";
import UserProfile from "./UserProfile";
import VouchingProcess from "./VouchingProcess";

enum Stage {
  UserProfile,
  SkillVouchRequest,
  VouchingProcess,
  CommunityValidation,
}
interface BaseProfile {
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
declare global {
  interface Window {
    ethereum: any;
  }
}

export default function Component() {
  const { stage, setStage } = useStore();

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-4">
          <div className="flex h-[60px] items-center justify-center w-full">
            <button
              onClick={() => {
                setStage(Stage.UserProfile);
              }}
              className={`flex items-center gap-3 font-semibold py-2 px-16 rounded-lg ${
                stage === Stage.UserProfile ? "bg-gray-200 " : ""
              }`}
            >
              <UserIcon className="h-6 w-6" />
              <span className="">Profile</span>
            </button>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <button
                onClick={() => {
                  setStage(Stage.SkillVouchRequest);
                }}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                  stage === Stage.SkillVouchRequest ? "bg-gray-200" : ""
                }`}
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800">
                  <span className="text-lg font-bold text-gray-900 dark:text-gray-50">
                    1
                  </span>
                </div>{" "}
                Skill Vouch Request
              </button>
              <button
                onClick={() => {
                  setStage(Stage.VouchingProcess);
                }}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                  stage === Stage.VouchingProcess ? "bg-gray-200" : ""
                }`}
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800">
                  <span className="text-lg font-bold text-gray-900 dark:text-gray-50">
                    2
                  </span>
                </div>{" "}
                Vouching Stage
              </button>
              <button
                onClick={() => {
                  setStage(Stage.CommunityValidation);
                }}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                  stage === Stage.CommunityValidation ? "bg-gray-200" : ""
                }`}
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800">
                  <span className="text-lg font-bold text-gray-900 dark:text-gray-50">
                    3
                  </span>
                </div>{" "}
                Community Validation
              </button>
            </nav>
          </div>
        </div>
      </div>
      {stage === Stage.UserProfile && <UserProfile />}
      {stage === Stage.SkillVouchRequest && <SkillVouchRequest />}
      {stage === Stage.VouchingProcess && <VouchingProcess />}
      {stage === Stage.CommunityValidation && <CommunityValidation />}
    </div>
  );
}

function UserIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
