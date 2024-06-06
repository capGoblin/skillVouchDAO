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
import { GET_REQS, GET_VOUCHED } from "../../constants/subgraphQueries";
import { useEffect } from "react";

const VouchingProcess = () => {
  const APIURL =
    "https://api.studio.thegraph.com/query/77624/skillvouchdao/version/latest";
  const {
    stageTwoInputs,
    setStageTwoInputs,
    stageThreeInputs,
    setStageThreeInputs,
    contract,
    signer,
  } = useStore();

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

      const filteredData = requestData
        .map(
          (item: {
            requestId: any;
            skill: any;
            experience: string;
            project: string;
          }) => {
            if (item.experience !== "" || item.project !== "") {
              return {
                requestId: Number(item.requestId),
                skills: item.skill,
                POW: item.experience !== "" ? item.experience : item.project,
                selectedPOW: item.experience !== "" ? "Experience" : "Project",
                linkedin: "",
                github: "",
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

  function moveToCommunityValidation(id: any) {
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

    contract.moveRequestToCommunityValidation(id);
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
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => contract.vouchForSkill(input.requestId)}
                >
                  Vouch
                </Button>
                <Button
                  onClick={() => {
                    moveToCommunityValidation(input.requestId);
                  }}
                  className="mr-20"
                >
                  Move to Community Validation
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default VouchingProcess;
