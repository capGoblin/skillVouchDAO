import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CommunityValidation = () => {
  return (
    <div className="flex flex-col">
      <main className="flex-1 overflow-auto p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
          <Card>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
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
              </div>
              <div className="grid gap-2">
                <div>
                  <Label htmlFor="skills">Skills</Label>
                  <Input
                    id="skills"
                    type="text"
                    placeholder="JavaScript, React, Node.js"
                  />
                </div>
                <div>
                  <Label htmlFor="experience">Experience</Label>
                  <Input
                    id="experience"
                    type="text"
                    placeholder="Acme Inc. • 2019 - Present"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <a href="#" target="_blank">
                    <LinkedinIcon className="h-5 w-5" />
                  </a>
                  <a href="#" target="_blank">
                    <GithubIcon className="h-5 w-5" />
                  </a>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Vouched by 25 users
                  </div>
                  <div className="flex gap-2">
                    <Button variant="green">Yes</Button>
                    <Button variant="destructive">No</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <img src="/placeholder.svg" alt="User Avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="font-semibold">Jane Doe</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Frontend Developer
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <div>
                  <Label htmlFor="skills">Skills</Label>
                  <Input
                    id="skills"
                    type="text"
                    placeholder="HTML, CSS, JavaScript"
                  />
                </div>
                <div>
                  <Label htmlFor="experience">Experience</Label>
                  <Input
                    id="experience"
                    type="text"
                    placeholder="Acme Inc. • 2017 - Present"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <a href="#" target="_blank">
                    <LinkedinIcon className="h-5 w-5" />
                  </a>
                  <a href="#" target="_blank">
                    <GithubIcon className="h-5 w-5" />
                  </a>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Vouched by 18 users
                  </div>
                  <div className="flex gap-2">
                    <Button variant="green">Yes</Button>
                    <Button variant="destructive">No</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <img src="/placeholder.svg" alt="User Avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="font-semibold">Bob Smith</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Backend Developer
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <div>
                  <Label htmlFor="skills">Skills</Label>
                  <Input
                    id="skills"
                    type="text"
                    placeholder="Node.js, Express, MongoDB"
                  />
                </div>
                <div>
                  <Label htmlFor="experience">Experience</Label>
                  <Input
                    id="experience"
                    type="text"
                    placeholder="Acme Inc. • 2015 - Present"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <a href="#" target="_blank">
                    <LinkedinIcon className="h-5 w-5" />
                  </a>
                  <a href="#" target="_blank">
                    <GithubIcon className="h-5 w-5" />
                  </a>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Vouched by 32 users
                  </div>
                  <div className="flex gap-2">
                    <Button variant="green">Yes</Button>
                    <Button variant="destructive">No</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
