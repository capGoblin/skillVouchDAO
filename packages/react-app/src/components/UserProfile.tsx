import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Client, cacheExchange, fetchExchange } from "@urql/core";
import { GET_REQ_BY_USER, GET_ACCEPTED } from "../../constants/subgraphQueries";
import { useEffect, useState } from "react";
import { useStore } from "../store/store";

interface RequestCreated {
  id: string;
  requestId: string;
  user: string;
  skill: string;
  experience: string;
  project: string;
  stakeAmount: string;
}

const UserProfile = () => {
  const APIURL =
    "https://api.studio.thegraph.com/query/77624/skillvouchdao/version/latest";
  const { stageThreeInputs, setStageThreeInputs, contract, signer } =
    useStore();

  const [acceptedReqs, setAcceptedReqs] = useState<RequestCreated[]>([]);

  const queryData = async () => {
    const address = await signer.getAddress();

    const client = new Client({
      url: APIURL,
      exchanges: [cacheExchange, fetchExchange],
    });

    const data = await client
      .query(GET_REQ_BY_USER, { userAddress: `${address}` })
      .toPromise();

    console.log(address);
    console.log(client);

    console.log(data);

    return data.data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data: any = await queryData();
      const requestData = data.requestCreateds;
      console.log(requestData);
      const requestIdArray = requestData.map(
        (item: { requestId: any }) => item.requestId
      );

      console.log(requestData);
      console.log(requestIdArray);

      const client = new Client({
        url: APIURL,
        exchanges: [cacheExchange, fetchExchange],
      });

      // const resultDictionary: { [key: string]: number } = {};
      const acceptedReqs: string[] = [];
      await Promise.all(
        requestIdArray.map(async (id: any) => {
          const data = await client.query(GET_ACCEPTED, { id }).toPromise();
          if (data.data.requestCloseds.length == 1) acceptedReqs.push(id);
        })
      );

      const acceptedReqsData: RequestCreated[] = requestData.filter(
        (item: { requestId: any }) => acceptedReqs.includes(item.requestId)
      );
      setAcceptedReqs(acceptedReqsData);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      <main className="flex-1 overflow-auto p-6 md:p-10">
        <div className="grid gap-6 md:grid-cols-[180px_1fr] lg:gap-10">
          <div className="flex flex-col items-center">
            <img
              src="/placeholder.svg"
              width="180"
              height="180"
              alt="User Avatar"
              className="h-[180px] w-[180px] rounded-full object-cover"
            />
            <div className="mt-4 space-y-1 text-center">
              <h1 className="text-2xl font-bold">John Doe</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Software Engineer
              </p>
            </div>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Skills</h2>
                <Button variant="ghost" size="icon">
                  <PlusIcon className="h-4 w-4" />
                  <span className="sr-only">Add Skill</span>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                {acceptedReqs.map((req) =>
                  req.skill
                    .split(",")
                    .map((skill: string) => skill.trim())
                    .map((skill: string) => (
                      <Badge variant="secondary">{skill}</Badge>
                    ))
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Experience</h2>
                <Button variant="ghost" size="icon">
                  <PlusIcon className="h-4 w-4" />
                  <span className="sr-only">Add Experience</span>
                </Button>
              </div>
              <div className="space-y-4">
                {acceptedReqs.map((req) => (
                  <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
                    <div className="flex flex-row gap-4">
                      {req.experience
                        .split(",")
                        .map((experience: string) => experience.trim())
                        .map((experience: string) => (
                          <h3 className="font-medium">{experience}</h3>
                        ))}
                    </div>
                    <Button variant="ghost" size="icon">
                      <CheckIcon className="h-4 w-4 text-green-500" />
                      <span className="sr-only">Vouch</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Projects</h2>
                <Button variant="ghost" size="icon">
                  <PlusIcon className="h-4 w-4" />
                  <span className="sr-only">Add Project</span>
                </Button>
              </div>
              <div className="space-y-4">
                {acceptedReqs.map((req) =>
                  req.project.trim() !== "" ? (
                    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
                      <div className="flex flex-row gap-4">
                        {req.project
                          .split(",")
                          .map((project: string) => project.trim())
                          .map((project: string) => (
                            <h3 className="font-medium">{project}</h3>
                          ))}
                      </div>
                      <Button variant="ghost" size="icon">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span className="sr-only">Vouch</span>
                      </Button>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;

function CheckIcon(props: any) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function PlusIcon(props: any) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
