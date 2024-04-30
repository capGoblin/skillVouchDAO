/**
 * v0 by Vercel.
 * @see https://v0.dev/t/X7bu3TMa3gf
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export default function Component() {
  return (
    <div key="1" className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <a className="flex items-center gap-2 font-semibold" href="#">
              <UserIcon className="h-6 w-6" />
              <span>User Profile</span>
            </a>
            <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
              <BellIcon className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <a
                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                href="#"
              >
                <UserIcon className="h-4 w-4" />
                Profile
              </a>
              <a
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <BriefcaseIcon className="h-4 w-4" />
                Experience
              </a>
              <a
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <ClipboardIcon className="h-4 w-4" />
                Projects
              </a>
              <a
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <CpuIcon className="h-4 w-4" />
                Skills
              </a>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Vouching Process</h3>
                  <Button size="icon" variant="ghost">
                    <PlusIcon className="h-4 w-4" />
                    <span className="sr-only">Add Vouching Process</span>
                  </Button>
                </div>
                <div className="grid gap-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Provide an overview of the vouching process, including how
                    users can request verification from vouches and the
                    importance of accurate endorsements.
                  </p>
                  <Button size="sm" variant="ghost">
                    Request Verification
                  </Button>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Explain the collateral commitment required from vouches when
                    accepting verification requests.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Describe the escrow mechanism used to hold collateral during
                    the verification process, ensuring fairness and
                    accountability.
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">
                    Community Validation
                  </h3>
                  <Button size="icon" variant="ghost">
                    <PlusIcon className="h-4 w-4" />
                    <span className="sr-only">Add Community Validation</span>
                  </Button>
                </div>
                <div className="grid gap-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Explain the role of community validation in ensuring the
                    accuracy and reliability of endorsements.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Provide information on how validators are selected and their
                    role in reviewing endorsements for accuracy.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Describe the token-based voting mechanism used for community
                    governance, including voting on endorsements.
                  </p>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <a className="lg:hidden" href="#">
            <UserIcon className="h-6 w-6" />
            <span className="sr-only">Profile</span>
          </a>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                  placeholder="Search users..."
                  type="search"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                size="icon"
                variant="ghost"
              >
                <img
                  alt="Avatar"
                  className="rounded-full"
                  height="32"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "32/32",
                    objectFit: "cover",
                  }}
                  width="32"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 flex flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid gap-6 md:grid-cols-[200px_1fr] items-start">
            <div className="flex flex-col items-center gap-4">
              <img
                alt="User Avatar"
                className="rounded-full"
                height="200"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "200/200",
                  objectFit: "cover",
                }}
                width="200"
              />
              <div className="text-center">
                <h1 className="text-2xl font-bold">John Doe</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Software Engineer
                </p>
              </div>
            </div>
            <div className="grid gap-8">
              <div className="grid gap-2">
                <div className="flex items-center justify-center">
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold">Skills</h2>
                      <Button size="icon" variant="ghost">
                        <PlusIcon className="h-4 w-4" />
                        <span className="sr-only">Add Skill</span>
                      </Button>
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">JavaScript</Badge>
                        <Badge variant="secondary">React</Badge>
                        <Badge variant="secondary">Node.js</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">TypeScript</Badge>
                        <Badge variant="secondary">Next.js</Badge>
                        <Badge variant="secondary">MongoDB</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Experience</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Experience</h2>
                        <Button size="icon" variant="ghost">
                          <PlusIcon className="h-4 w-4" />
                          <span className="sr-only">Add Experience</span>
                        </Button>
                      </div>
                      <div className="grid gap-4">
                        <div className="grid gap-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-medium">
                              Software Engineer
                            </h3>
                            <Badge variant="outline">Verified</Badge>
                          </div>
                          <p className="text-gray-500 dark:text-gray-400">
                            Acme Inc. | 2019 - Present
                          </p>
                          <p>
                            Developed and maintained web applications using
                            React, Node.js, and MongoDB.
                          </p>
                        </div>
                        <div className="grid gap-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-medium">Intern</h3>
                            <Button size="icon" variant="ghost">
                              <CheckIcon className="h-4 w-4" />
                              <span className="sr-only">Vouch Experience</span>
                            </Button>
                          </div>
                          <p className="text-gray-500 dark:text-gray-400">
                            Acme Inc. | 2018 - 2019
                          </p>
                          <p>
                            Assisted with front-end development and testing.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Projects</h2>
                        <Button size="icon" variant="ghost">
                          <PlusIcon className="h-4 w-4" />
                          <span className="sr-only">Add Project</span>
                        </Button>
                      </div>
                      <div className="grid gap-4">
                        <div className="grid gap-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-medium">
                              Acme Web App
                            </h3>
                            <Badge variant="outline">Verified</Badge>
                          </div>
                          <p className="text-gray-500 dark:text-gray-400">
                            2021 - 2022
                          </p>
                          <p>
                            Developed a web application for Acme Inc. using
                            React, Node.js, and MongoDB.
                          </p>
                        </div>
                        <div className="grid gap-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-medium">
                              Personal Portfolio
                            </h3>
                            <Button size="icon" variant="ghost">
                              <CheckIcon className="h-4 w-4" />
                              <span className="sr-only">Vouch Project</span>
                            </Button>
                          </div>
                          <p className="text-gray-500 dark:text-gray-400">
                            2020
                          </p>
                          <p>
                            Designed and built a personal portfolio website
                            using Next.js and Tailwind CSS.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button size="icon" variant="ghost">
                    <PlusIcon className="h-4 w-4" />
                    <span className="sr-only">Add Experience</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function BellIcon(props: any) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function BriefcaseIcon(props: any) {
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
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
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
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ClipboardIcon(props: any) {
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
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
}

function CpuIcon(props: any) {
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
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M15 2v2" />
      <path d="M15 20v2" />
      <path d="M2 15h2" />
      <path d="M2 9h2" />
      <path d="M20 15h2" />
      <path d="M20 9h2" />
      <path d="M9 2v2" />
      <path d="M9 20v2" />
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

function SearchIcon(props: any) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function UserIcon(props: any) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
