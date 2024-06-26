import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { useStore } from "../store/store";
import { GlareCard } from "./ui/glare-card";
import { Input } from "./ui/input";

interface RequestCreated {
  id: string;
  requestId: string;
  user: string;
  skill: string;
  experience: string;
  project: string;
  stakeAmount: string;
  gitHubLink: string;
  linkedInLink: string;
}

type NFTGlareCardProps = {
  acceptedReqs: RequestCreated[];
};

export function NFTGlareCard({ acceptedReqs }: NFTGlareCardProps) {
  const [name, setName] = useState("John.ens");
  const [title, setTitle] = useState("Software Engineer");

  const [showLinkedinInput, setShowLinkedinInput] = useState(false);
  const [showGithubInput, setShowGithubInput] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [showTitleInput, setShowTitleInput] = useState(false);

  const { setLinkedInLink, setGithubLink, githubLink, linkedInLink } =
    useStore();
  const [selectedImage, setSelectedImage] = useState(
    "/default-avatar-profile-icon-social-600nw-1677509740.webp"
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const [acceptedReqs, setAcceptedReqs] = useState<RequestCreated[]>([]);
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

  // Calculate if the number of items is odd
  const isOdd = acceptedReqs.length % 2 !== 0;
  console.log(acceptedReqs);

  // useEffect(() => {
  //   setAcceptedReqs([
  //     {
  //       id: "1",
  //       requestId: "req-001",
  //       user: "John.ens",
  //       skill: "REACT",
  //       experience: "5 years",
  //       project: "Project Alpha",
  //       stakeAmount: "1000",
  //     },
  //     {
  //       id: "2",
  //       requestId: "req-002",
  //       user: "Jane Smith",
  //       skill: "NODE",
  //       experience: "3 years",
  //       project: "Project Beta",
  //       stakeAmount: "1500",
  //     },
  //     {
  //       id: "3",
  //       requestId: "req-003",
  //       user: "Mike Johnson",
  //       skill: "ANGULAR",
  //       experience: "2 years",
  //       project: "Project Gamma",
  //       stakeAmount: "1200",
  //     },
  //     {
  //       id: "1",
  //       requestId: "req-001",
  //       user: "John.ens",
  //       skill: "NEST",
  //       experience: "5 years",
  //       project: "Project Alpha",
  //       stakeAmount: "1000",
  //     },
  //     {
  //       id: "2",
  //       requestId: "req-002",
  //       user: "Jane Smith",
  //       skill: "trUFFLE",
  //       experience: "3 years",
  //       project: "Project Beta",
  //       stakeAmount: "1500",
  //     },
  //     {
  //       id: "3",
  //       requestId: "req-003",
  //       user: "Mike Johnson",
  //       skill: "GANACHE",
  //       experience: "2 years",
  //       project: "Project Gamma",
  //       stakeAmount: "1200",
  //     },
  //   ]);
  // }, []);
  return (
    // < className="w-[420px] [aspect-ratio:15/21] bg-white dark:bg-zinc-900">
    <GlareCard className="flex flex-col max-w-7xl items-center justify-between py-10">
      <img
        src={selectedImage}
        width="180"
        height="180"
        alt="User Avatar"
        className="size-36 rounded-full object-cover mb-3"
        onClick={handleImageClick}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <div className="flex flex-col items-center justify-center space-y-3">
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
            className="text-2xl font-bold cursor-pointer"
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
            className="text-gray-500 dark:text-gray-400 cursor-pointer"
            onClick={() => setShowTitleInput(true)}
          >
            {title}
          </div>
        )}
        <Badge variant="outline" className="mt-6">
          Verified
        </Badge>
      </div>
      <div className="flex justify-center space-x-6 m-3">
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
              <CheckIcon className="size-6" />
              <span className="sr-only">Save LinkedIn</span>
            </Button>
          </div>
        ) : (
          <a
            href={acceptedReqs[0] ? acceptedReqs[0].linkedInLink : ""}
            target="_blank"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            onClick={() => setShowLinkedinInput(true)}
          >
            <LinkedinIcon className="size-6" />
            <span className="sr-only">LinkedIn</span>
          </a>
        )}
        {showGithubInput ? (
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={acceptedReqs[0] ? acceptedReqs[0].gitHubLink : ""}
              onChange={(e) => setGithubLink(e.target.value)}
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowGithubInput(false)}
            >
              <CheckIcon className="size-6" />
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
            <GithubIcon className="size-6" />
            <span className="sr-only">GitHub</span>
          </a>
        )}
      </div>

      {/* <Button
        variant="ghost"
        size="icon"
        // onClick={() => setStage(Stage.SkillVouchRequest)}
      >
        <PlusIcon className="h-4 w-4" />
        <span className="sr-only">Add Skill</span>
      </Button> */}
      {/* <div className="grid grid-cols-2 gap-4 max-w-80">
        {acceptedReqs.map((req, index) => (
          <div
            className={`${
              isOdd && index === acceptedReqs.length - 1
                ? "col-span-2 place-self-center size-4"
                : ""
            }`}
          >
            {req.skill
              .split(",")
              .map((skill: string) => skill.trim())
              .map((skill: string) => (
                <Badge variant="secondary">{skill}</Badge>
              ))}
          </div>
        ))}
      </div> */}
      <div className="w-3/4 flex flex-wrap gap-4 max-w-80">
        {acceptedReqs.map((req, index) => (
          <div
            className={`${
              isOdd && index === acceptedReqs.length - 1
                ? "flex w-full justify-center mx-auto"
                : "flex justify-center mx-auto"
            }`}
          >
            {req.skill
              .split(",")
              .map((skill: string) => skill.trim())
              .map((skill: string) => (
                <Badge variant="secondary">{skill}</Badge>
              ))}
          </div>
        ))}
      </div>
    </GlareCard>
    // </BackgroundGradient>
  );
}

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

// function PlusIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M5 12h14" />
//       <path d="M12 5v14" />
//     </svg>
//   );
// }

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
