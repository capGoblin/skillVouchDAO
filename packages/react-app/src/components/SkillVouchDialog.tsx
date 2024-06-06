import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { ExperienceOrProjectDropdown } from "./ExperienceOrProjectDropdown";

interface SkillVouchDialogProps {
  saveChanges: (
    skills: string,
    POW: string,
    selectedPOW: string,
    stakeAmount: string,
    linkedin: string,
    github: string
  ) => void;
}

export function SkillVouchDialog({ saveChanges }: SkillVouchDialogProps) {
  const [selectedOption, setSelectedOption] = useState<string>("Experience");
  const [skills, setSkills] = useState("");
  const [POW, setPOW] = useState("");
  const [stakeAmount, setStakeAmount] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    saveChanges(skills, POW, selectedOption, stakeAmount, linkedin, github);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    console.log(option);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <FaPlus className="mr-5" /> Create New Request
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Request</DialogTitle>
          <DialogDescription>
            Draft changes to your request here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="skills" className="text-right">
              Skills
            </Label>
            <Input
              id="skill"
              className="ml-5 w-60 max-w-lg"
              placeholder="JavaScript, React, Node.js"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="text-right mb-1">
              <ExperienceOrProjectDropdown onChange={handleOptionChange} />
            </div>
            <Input
              id="POW"
              className="ml-5 w-60 max-w-lg"
              placeholder={
                selectedOption === "Experience"
                  ? "Acme Inc. • 2019 - Present"
                  : "My Cool Project • 2020"
              }
              value={POW}
              onChange={(e) => setPOW(e.target.value)}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="github" className="text-right">
              Stake Amount
            </Label>
            <Input
              id="stake"
              placeholder="Stake Amount of SVT (Min: 20)"
              className="ml-5 w-60 max-w-lg"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="linkedin" className="text-right">
              LinkedIn
            </Label>
            <Input
              id="linkedin"
              placeholder="Your LinkedIn profile URL"
              className="ml-5 w-60 max-w-lg"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="github" className="text-right">
              GitHub
            </Label>
            <Input
              id="github"
              placeholder="Your GitHub profile URL"
              className="ml-5 w-60 max-w-lg"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save Changes
          </Button>
          <div>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
