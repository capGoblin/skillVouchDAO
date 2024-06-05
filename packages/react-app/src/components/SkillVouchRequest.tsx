import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SkillVouchDialog } from "./SkillVouchDialog";

const SkillVouchRequest = () => {
  const [inputs, setInputs] = useState<string[][]>([]);

  const saveChanges = (
    skills: string,
    POW: string,
    selectedPOW: string,
    linkedin: string,
    github: string
  ) => {
    setInputs((prevInputs) => [
      ...prevInputs,
      [skills, POW, selectedPOW, linkedin, github],
    ]);
  };

  return (
    <div className="flex flex-col">
      <main className="flex-1 overflow-auto p-6 md:p-10">
        <div className="flex justify-end">
          <SkillVouchDialog saveChanges={saveChanges} />{" "}
        </div>
        <div className="grid grid-cols-2 gap-40 mr-32">
          {inputs.map((input, index) => (
            <div className="grid gap-5" key={index}>
              <div className="flex mb-4 space-x-11">
                <div className="font-bold text-lg">Skills</div>
                <div className="inline-block ml-2 text-lg">{input[0]}</div>
              </div>
              <div className="flex mb-4 space-x-11">
                <div className="font-bold text-lg">{input[2]}</div>
                <div className="inline-block ml-2 text-lg">{input[1]}</div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <a href={input[3]} target="_blank" rel="noopener noreferrer">
                  <LinkedinIcon className="h-6 w-6" />
                </a>
                <a href={input[4]} target="_blank" rel="noopener noreferrer">
                  <GithubIcon className="h-6 w-6" />
                </a>
              </div>
              <Button onClick={() => {}} className="mr-20">
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
