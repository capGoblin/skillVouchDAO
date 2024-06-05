import { useState } from "react";
import { Button } from "@/components/ui/button";
import CommunityValidation from "./CommunityValidation";
import SkillVouchRequest from "./SkillVouchRequest";
import VouchingProcess from "./VouchingProcess";
import UserProfile from "./UserProfile";

enum Stage {
  UserProfile,
  SkillVouchRequest,
  VouchingProcess,
  CommunityValidation,
}

export default function Component() {
  const [stage, setStage] = useState<Stage>();
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-4">
          <div className="flex h-[60px] items-center border-b px-6">
            <button
              onClick={() => {
                setStage(Stage.UserProfile);
              }}
              className="flex items-center gap-2 font-semibold"
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
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <BriefcaseIcon className="h-4 w-4" />
                Skill Vouch Request
              </button>
              <button
                onClick={() => {
                  setStage(Stage.VouchingProcess);
                }}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <BriefcaseIcon className="h-4 w-4" />
                Vouching Stage
              </button>
              <button
                onClick={() => {
                  setStage(Stage.CommunityValidation);
                }}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <BriefcaseIcon className="h-4 w-4" />
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

function BriefcaseIcon(props: any) {
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
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
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
