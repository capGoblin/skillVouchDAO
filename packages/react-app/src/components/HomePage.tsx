import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useStore } from "../store/store";
import CommunityValidation from "./CommunityValidation";
import SkillVouchRequest from "./SkillVouchRequest";
import UserProfile from "./UserProfile";
import VouchingProcess from "./VouchingProcess";
import SkillVouchContract from "../../artifacts/contracts/SkillVouchContract.sol/SkillVouchContract.json";

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
  const {
    stage,
    setStage,
    stageOneInputs,
    setStageOneInputs,
    stageTwoInputs,
    setStageTwoInputs,
    stageThreeInputs,
    setStageThreeInputs,
    contract,
    setContract,
    provider,
    setProvider,
    signer,
    setSigner,
  } = useStore();

  useEffect(() => {
    const initialize = async () => {
      if (window.ethereum == null) {
        // If MetaMask is not installed, we use the default provider,
        // which is backed by a variety of third-party services (such
        // as INFURA). They do not have private keys installed,
        // so they only have read-only access
        console.log("MetaMask not installed; using read-only defaults");
        setProvider(ethers.getDefaultProvider());
      } else {
        // Connect to the MetaMask EIP-1193 object. This is a standard
        // protocol that allows Ethers access to make all read-only
        // requests through MetaMask.
        const providerT = new ethers.BrowserProvider(window.ethereum);
        // It also provides an opportunity to request access to write
        // operations, which will be performed by the private key
        // that MetaMask manages for the user.

        // "0x966efc9A9247116398441d87085637400A596C3F",
        const signerT = await providerT.getSigner();
        const contractT = new ethers.Contract(
          "0xCfB9fCb9b6395B92673C4B15fA8aaDA81dC450b4",
          SkillVouchContract.abi,
          signerT
        );
        setContract(contractT);
        setSigner(signerT);
        setProvider(providerT);

        await contractT.mintTokensToNewUsers();
      }
    };

    initialize();
  }, []);

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
