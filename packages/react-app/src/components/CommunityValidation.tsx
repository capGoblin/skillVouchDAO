import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useStore } from "../store/store";
import {
  GET_REQS,
  GET_VOTES,
  GET_VOUCHED,
} from "../../constants/subgraphQueries";
import { Client, cacheExchange, fetchExchange } from "@urql/core";
import { useEffect } from "react";

const CommunityValidation = () => {
  const APIURL =
    "https://api.studio.thegraph.com/query/77624/skillvouchdao/version/latest";
  const { stageThreeInputs, setStageThreeInputs, contract, signer } =
    useStore();

  const queryData = async () => {
    const address = await signer.getAddress();

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
          }) => {
            if (item.experience !== "" || item.project !== "") {
              console.log(trueCounts);
              console.log(falseCounts);
              return {
                requestId: Number(item.requestId),
                skills: item.skill,
                POW: item.experience !== "" ? item.experience : item.project,
                selectedPOW: item.experience !== "" ? "Experience" : "Project",
                linkedin: "",
                github: "",
                NoOfVouched: Number(resultDictionary[item.requestId]) || 0,
                NoOfYesVotes: Number(trueCounts[item.requestId]) || 0,
                NoOfNoVotes: Number(falseCounts[item.requestId]) || 0,
              };
            }
          }
        )
        .filter(Boolean);

      console.log(filteredData);

      setStageThreeInputs(filteredData);
    };

    fetchData();
  }, [fetch]);

  function voted(id: number, acceptance: boolean): void {
    contract.castVote(id, acceptance);
  }

  return (
    <div className="flex flex-col">
      <main className="flex-1 overflow-auto p-6 md:p-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {stageThreeInputs.map((input, index) => (
            <Card key={index}>
              <CardHeader className="flex items-center gap-4">
                <Avatar>
                  <img src="/placeholder.svg" alt="User Avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="font-semibold">John Doe</div>
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
                    {" "}
                    {input.selectedPOW}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {input.POW}
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Vouched by {input.NoOfVouched} users
                </div>
              </CardContent>
              <div className="flex justify-evenly space-x-12 mb-8 mr-5">
                <Button
                  variant="green"
                  className="w-1/2 mx-5"
                  onClick={() => voted(input.requestId, true)}
                >
                  Yes
                </Button>
                <Button
                  variant="destructive"
                  className="w-1/2 mx-5"
                  onClick={() => voted(input.requestId, false)}
                >
                  No
                </Button>
              </div>
              <div className="flex justify-center -mt-4 mb-4">
                <Button
                  variant="secondary"
                  className="w-full mx-5"
                  onClick={() => contract.closeRequest(index)}
                >
                  Close
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CommunityValidation;

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
