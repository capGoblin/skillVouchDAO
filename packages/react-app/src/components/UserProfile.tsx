import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Client, cacheExchange, fetchExchange } from "@urql/core";
import { useEffect, useRef, useState } from "react";
import { GET_ACCEPTED, GET_REQ_BY_USER } from "../../constants/subgraphQueries";
import { useStore } from "../store/store";
import { Input } from "./ui/input";
enum Stage {
  UserProfile,
  SkillVouchRequest,
  VouchingProcess,
  CommunityValidation,
}
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
  const [name, setName] = useState("John Doe");
  const [title, setTitle] = useState("Software Engineer");
  // const [linkedInLink, setLinkedInLink] = useState(
  //   "https://www.linkedin.com/in/johndoe"
  // );
  // const [githubLink, setGithubLink] = useState("https://github.com/johndoe");
  const [iconPrompt, setIconPrompt] = useState("User");
  const [showLinkedinInput, setShowLinkedinInput] = useState(false);
  const [showGithubInput, setShowGithubInput] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [showTitleInput, setShowTitleInput] = useState(false);

  const APIURL =
    "https://api.studio.thegraph.com/query/77624/skillvouchdao/0.0.3";
  const {
    setStage,
    stageThreeInputs,
    setStageThreeInputs,
    contract,
    signer,
    setLinkedInLink,
    setGithubLink,
    githubLink,
    linkedInLink,
  } = useStore();

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

  const [selectedImage, setSelectedImage] = useState(
    "../../public/default-avatar-profile-icon-social-600nw-1677509740.webp"
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col">
      <main className="flex-1 overflow-auto p-6 md:p-10">
        <div className="grid gap-6 md:grid-cols-[3fr_9fr] lg:gap-10 px-20">
          {" "}
          <div className="flex flex-col items-center px-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
            <img
              src={selectedImage}
              width="180"
              height="180"
              alt="User Avatar"
              className="h-[180px] w-[180px] rounded-full object-cover"
              onClick={handleImageClick}
            />
            <div className="text-center">
              {showNameInput ? (
                <div className="flex items-center">
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-2xl font-bold"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowNameInput(false)}
                  >
                    <CheckIcon className="h-5 w-5" />
                    <span className="sr-only">Save Name</span>
                  </Button>
                </div>
              ) : (
                <div
                  className="text-2xl font-bold cursor-pointer m-3"
                  onClick={() => setShowNameInput(true)}
                >
                  {name}
                </div>
              )}
              {showTitleInput ? (
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-gray-500 dark:text-gray-400"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowTitleInput(false)}
                  >
                    <CheckIcon className="h-5 w-5" />
                    <span className="sr-only">Save Title</span>
                  </Button>
                </div>
              ) : (
                <div
                  className="text-gray-500 dark:text-gray-400 cursor-pointer m-3"
                  onClick={() => setShowTitleInput(true)}
                >
                  {title}
                </div>
              )}
              <div className="flex items-center justify-center gap-2 mt-4">
                {showLinkedinInput ? (
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      value={linkedInLink}
                      onChange={(e) => setLinkedInLink(e.target.value)}
                      className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowLinkedinInput(false)}
                    >
                      <CheckIcon className="h-5 w-5" />
                      <span className="sr-only">Save LinkedIn</span>
                    </Button>
                  </div>
                ) : (
                  <a
                    href={linkedInLink}
                    target="_blank"
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    onClick={() => setShowLinkedinInput(true)}
                  >
                    <LinkedinIcon className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                )}
                {showGithubInput ? (
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      value={githubLink}
                      onChange={(e) => setGithubLink(e.target.value)}
                      className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowGithubInput(false)}
                    >
                      <CheckIcon className="h-5 w-5" />
                      <span className="sr-only">Save GitHub</span>
                    </Button>
                  </div>
                ) : (
                  <a
                    href={githubLink}
                    target="_blank"
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    onClick={() => setShowGithubInput(true)}
                  >
                    <GithubIcon className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </a>
                )}
              </div>
            </div>
            <Badge variant="outline" className="mt-6">
              Verified
            </Badge>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Skills</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setStage(Stage.SkillVouchRequest)}
                >
                  <PlusIcon className="h-4 w-4" />
                  <span className="sr-only">Add Skill</span>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                {acceptedReqs.map((req) => (
                  <div className="flex items-center gap-2">
                    {req.skill
                      .split(",")
                      .map((skill: string) => skill.trim())
                      .map((skill: string) => (
                        <Badge variant="secondary">{skill}</Badge>
                      ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Experience</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setStage(Stage.SkillVouchRequest)}
                >
                  <PlusIcon className="h-4 w-4" />
                  <span className="sr-only">Add Experience</span>
                </Button>
              </div>
              <div className="space-y-4">
                {acceptedReqs.map((req) =>
                  req.experience.trim() !== "" ? (
                    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
                      <div className="flex flex-row gap-4">
                        {req.experience
                          .split(",")
                          .map((experience: string) => experience.trim())
                          .map((experience: string) => (
                            <h2 className="font-medium">{experience}</h2>
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
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Projects</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setStage(Stage.SkillVouchRequest)}
                >
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
                            <h2 className="font-medium">{project}</h2>
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
