import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useStore } from "../store/store";
import { Client, cacheExchange, fetchExchange } from "@urql/core";
import {
  GET_REQS,
  GET_VOUCHED,
  GET_VOTES,
} from "../../constants/subgraphQueries";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { useEthersSigner } from "../lib/ethers";
import SkillVouchContract from "../../artifacts/contracts/SkillVouchContract.sol/SkillVouchContract.json";

const VouchingProcess = () => {
  const { address } = useAccount();

  const signer: ethers.JsonRpcSigner =
    useEthersSigner() as ethers.JsonRpcSigner;

  const contract = new ethers.Contract(
    "0x4ffFa4B9Ac841BEf20910caE3d2F52A9D85F4314",
    SkillVouchContract.abi,
    signer
  );

  const APIURL =
    "https://api.studio.thegraph.com/query/77624/skillvouchdao/0.0.4";

  const [fetch, setFetch] = useState(false);

  const {
    stageTwoInputs,
    setStageTwoInputs,
    stageThreeInputs,
    setStageThreeInputs,
  } = useStore();

  const queryData = async () => {
    const client = new Client({
      url: APIURL,
      exchanges: [cacheExchange, fetchExchange],
    });

    const data = await client.query(GET_REQS, {}).toPromise();

    console.log(address);
    console.log(client);

    console.log(data);

    return data.data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data: any = await queryData();
      const requestData = data.requestCreateds;
      const requestIdArray = requestData.map(
        (item: { requestId: any }) => item.requestId
      );

      console.log(requestData);
      console.log(requestIdArray);

      const client = new Client({
        url: APIURL,
        exchanges: [cacheExchange, fetchExchange],
      });

      const resultDictionary: { [key: string]: number } = {};
      await Promise.all(
        requestIdArray.map(async (id: any) => {
          const data = await client.query(GET_VOUCHED, { id }).toPromise();
          resultDictionary[id] = data.data.skillVoucheds.length;
        })
      );

      const trueCounts: { [key: string]: number } = {};
      const falseCounts: { [key: string]: number } = {};

      await Promise.all(
        requestIdArray.map(async (id: any) => {
          const data = await client.query(GET_VOTES, { id }).toPromise();

          if (!trueCounts[id]) {
            trueCounts[id] = 0;
          }

          if (!falseCounts[id]) {
            falseCounts[id] = 0;
          }

          data.data.voteCasteds.forEach((vote: { acceptance: any }) => {
            if (vote.acceptance) {
              trueCounts[id]++;
            } else {
              falseCounts[id]++;
            }
          });
        })
      );

      const filteredData = requestData
        .map(
          (item: {
            requestId: any;
            skill: any;
            experience: string;
            project: string;
            linkedInLink: string;
            gitHubLink: string;
          }) => {
            if (
              (item.experience !== "" || item.project !== "") &&
              Number(trueCounts[item.requestId]) === 0 &&
              Number(trueCounts[item.requestId]) === 0
            ) {
              console.log(item.linkedInLink);
              console.log(item.gitHubLink);
              return {
                requestId: Number(item.requestId),
                skills: item.skill,
                POW: item.experience !== "" ? item.experience : item.project,
                selectedPOW: item.experience !== "" ? "Experience" : "Project",
                linkedin: item.linkedInLink,
                github: item.gitHubLink,
                NoOfVouched: Number(resultDictionary[item.requestId]) || 0,
              };
            }
          }
        )
        .filter(Boolean);

      console.log(filteredData);

      setStageTwoInputs(filteredData);
    };

    fetchData();
  }, [fetch]);

  async function moveToCommunityValidation(id: any) {
    contract.moveRequestToCommunityValidation(id);
    const index = stageTwoInputs.findIndex((item) => item.requestId === id);

    const item = stageTwoInputs[index];

    const newStageTwoInputs = [...stageTwoInputs];
    newStageTwoInputs.splice(index, 1);
    setStageTwoInputs(newStageTwoInputs);

    const newStageThreeInputs = [
      ...stageThreeInputs,
      { ...item, NoOfYesVotes: 0, NoOfNoVotes: 0 },
    ];
    setStageThreeInputs(newStageThreeInputs);
  }

  return (
    <div className="flex flex-col">
      <main className="flex-1 overflow-auto p-6 md:p-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {stageTwoInputs.map((input, index) => (
            <Card key={index}>
              <CardHeader className="flex items-center gap-4">
                <Avatar>
                  <img src="/placeholder.svg" alt="User Avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="font-semibold">John.ens</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Software Engineer
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div>
                  <div className="text-sm font-semibold">Skills</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {input.skills}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold">
                    {input.selectedPOW}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {input.POW}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">Vouched</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {input.NoOfVouched}
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <a
                    href={input.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedinIcon className="h-6 w-6" />
                  </a>
                  <a
                    href={input.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GithubIcon className="h-6 w-6" />
                  </a>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex flex-col w-full space-y-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      contract.vouchForSkill(input.requestId);
                      setFetch(true);
                    }}
                  >
                    Vouch
                  </Button>
                  <Button
                    onClick={() => {
                      moveToCommunityValidation(input.requestId);
                    }}
                    className="w-full"
                  >
                    Move to Community Validation
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default VouchingProcess;

function GithubIcon(props: any) {
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
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon(props: any) {
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
