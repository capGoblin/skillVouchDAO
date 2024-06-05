import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const VouchingProcess = () => {
  return (
    <div className="flex flex-col">
      <main className="flex-1 overflow-auto p-6 md:p-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Card>
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
                  JavaScript, React, Node.js, TypeScript, CSS, Git
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold">Experience</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Acme Inc. • 2019 - Present
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Vouched</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  12 users
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Vouch
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="flex items-center gap-4">
              <Avatar>
                <img src="/placeholder.svg" alt="User Avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">Jane Doe</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Software Engineer
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div>
                <div className="text-sm font-semibold">Skills</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  JavaScript, React, Node.js, TypeScript, CSS, Git
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold">Experience</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Globex Corp. • 2018 - 2019
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Vouched</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  8 users
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Vouch
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="flex items-center gap-4">
              <Avatar>
                <img src="/placeholder.svg" alt="User Avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">Bob Smith</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Software Engineer
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div>
                <div className="text-sm font-semibold">Skills</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  JavaScript, React, Node.js, TypeScript, CSS, Git
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold">Experience</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Acme Inc. • 2020 - Present
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Vouched</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  15 users
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Vouch
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="flex items-center gap-4">
              <Avatar>
                <img src="/placeholder.svg" alt="User Avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">Sarah Lee</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Software Engineer
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div>
                <div className="text-sm font-semibold">Skills</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  JavaScript, React, Node.js, TypeScript, CSS, Git
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold">Experience</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Globex Corp. • 2019 - Present
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Vouched</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  10 users
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Vouch
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default VouchingProcess;
