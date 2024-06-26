import { Button } from "@/components/ui/button";
import { Client, cacheExchange, fetchExchange } from "@urql/core";
import { useEffect, useState } from "react";
import { GET_REQ_BY_USER, GET_VOUCHED } from "../../constants/subgraphQueries";
import { useStore } from "../store/store";
import { SkillVouchDialog } from "./SkillVouchDialog";

const SkillVouchRequest = () => {
  const APIURL =
    "https://api.studio.thegraph.com/query/77624/skillvouchdao/0.0.4";
  const [fetch, setFetch] = useState(false);
  const {
    stageOneInputs,
    setStageOneInputs,
    stageTwoInputs,
    setStageTwoInputs,
    contract,
    signer,
    setLinkedInLink,
    setGithubLink,
  } = useStore();
  const queryData = async () => {
    const address = await signer.getAddress();

    const client = new Client({
      url: APIURL,
      exchanges: [cacheExchange, fetchExchange],
    });

    const data = await client
      .query(GET_REQ_BY_USER, { userAddress: `${address}` })
      .toPromise();

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

      // const trueCounts: { [key: string]: number } = {};
      // const falseCounts: { [key: string]: number } = {};

      // await Promise.all(
      //   requestIdArray.map(async (id: any) => {
      //     const data = await client.query(GET_VOTES, { id }).toPromise();

      //     data.data.voteCasteds.forEach((vote: { acceptance: any }) => {
      //       if (vote.acceptance) {
      //         trueCounts[id]++;
      //       } else {
      //         falseCounts[id]++;
      //       }
      //     });
      //   })
      // );

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
              !resultDictionary[item.requestId]
            ) {
              return {
                requestId: Number(item.requestId),
                skills: item.skill,
                POW: item.experience !== "" ? item.experience : item.project,
                selectedPOW: item.experience !== "" ? "Experience" : "Project",
                linkedin: item.linkedInLink,
                github: item.gitHubLink,
              };
            }
          }
        )
        .filter(Boolean);

      setStageOneInputs(filteredData);
    };

    fetchData();
  }, [fetch]);

  const saveChanges = async (
    skills: string,
    POW: string,
    selectedPOW: string,
    stakeAmount: string,
    linkedin: string,
    github: string
  ): Promise<void> => {
    // const stakeAmount = "21"; // Set the stake amount
    // const stakeAmountEth = ethers.parseUnits(stakeAmount, 18);

    // const stakeAmountWei = ethers.parseEther(stakeAmount); // Convert to Wei

    if (selectedPOW == "Experience")
      await contract.createRequest(
        skills,
        "",
        POW,
        Number(stakeAmount),
        linkedin,
        github
      );
    else
      await contract.createRequest(
        skills,
        POW,
        "",
        Number(stakeAmount),
        linkedin,
        github
      );

    // setStageOneInputs([
    //   ...stageOneInputs,
    //   {
    //     skills: skills,
    //     POW: POW,
    //     selectedPOW: selectedPOW,
    //     linkedin: linkedin,
    //     github: github,
    //   },
    // ]);
    setLinkedInLink(linkedin);
    setGithubLink(github);

    setFetch(true);
  };

  function moveToVouchingProcess(id: number) {
    const index = stageOneInputs.findIndex((item) => item.requestId === id);

    const item = stageOneInputs[index];

    const newStageOneInputs = [...stageOneInputs];
    newStageOneInputs.splice(index, 1);
    setStageOneInputs(newStageOneInputs);

    const newStageTwoInputs = [...stageTwoInputs, { ...item, NoOfVouched: 0 }];
    setStageTwoInputs(newStageTwoInputs);

    // contract.transitionRequestStatus(id, 0);
  }

  return (
    <div className="flex flex-col">
      <main className="flex-1 overflow-auto p-6 md:p-10">
        <div className="flex justify-end">
          <SkillVouchDialog saveChanges={saveChanges} />{" "}
        </div>
        <div className="grid grid-cols-2 gap-40 mr-32">
          {stageOneInputs.map((input: any, index) => (
            <div className="grid gap-5" key={index}>
              <div className="flex mb-4 space-x-11">
                <div className="font-bold text-lg">Skills</div>
                <div className="inline-block ml-2 text-lg">{input.skills}</div>
              </div>
              <div className="flex mb-4 space-x-11">
                <div className="font-bold text-lg">{input.selectedPOW}</div>
                <div className="inline-block ml-2 text-lg">{input.POW}</div>
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
              <Button
                onClick={() => {
                  moveToVouchingProcess(input.requestId);
                }}
                className="mr-20"
              >
                Move to Vouching Stage
              </Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SkillVouchRequest;

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
