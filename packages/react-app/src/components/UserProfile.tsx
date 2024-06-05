import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const UserProfile = () => {
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
                <Badge variant="secondary">JavaScript</Badge>
                <Badge variant="secondary">React</Badge>
                <Badge variant="secondary">Node.js</Badge>
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="secondary">CSS</Badge>
                <Badge variant="secondary">Git</Badge>
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
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
                  <img
                    src="/placeholder.svg"
                    width="48"
                    height="48"
                    alt="Company Logo"
                    className="h-12 w-12 rounded-md object-contain"
                  />
                  <div>
                    <h3 className="font-medium">Software Engineer</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Acme Inc. • 2019 - Present
                    </p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <CheckIcon className="h-4 w-4 text-green-500" />
                    <span className="sr-only">Vouch</span>
                  </Button>
                </div>
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
                  <img
                    src="/placeholder.svg"
                    width="48"
                    height="48"
                    alt="Company Logo"
                    className="h-12 w-12 rounded-md object-contain"
                  />
                  <div>
                    <h3 className="font-medium">Intern</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Globex Corp. • 2018 - 2019
                    </p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <CheckIcon className="h-4 w-4 text-green-500" />
                    <span className="sr-only">Vouch</span>
                  </Button>
                </div>
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
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
                  <img
                    src="/placeholder.svg"
                    width="48"
                    height="48"
                    alt="Project Thumbnail"
                    className="h-12 w-12 rounded-md object-cover"
                  />
                  <div>
                    <h3 className="font-medium">Acme Web App</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Developed a modern web application for Acme Inc.
                    </p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <CheckIcon className="h-4 w-4 text-green-500" />
                    <span className="sr-only">Vouch</span>
                  </Button>
                </div>
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
                  <img
                    src="/placeholder.svg"
                    width="48"
                    height="48"
                    alt="Project Thumbnail"
                    className="h-12 w-12 rounded-md object-cover"
                  />
                  <div>
                    <h3 className="font-medium">Globex Mobile App</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Designed and developed a mobile app for Globex Corp.
                    </p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <CheckIcon className="h-4 w-4 text-green-500" />
                    <span className="sr-only">Vouch</span>
                  </Button>
                </div>
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
