import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useStore } from "../store/store";

const VouchingProcess = () => {
  const {
    stageTwoInputs,
    setStageTwoInputs,
    stageThreeInputs,
    setStageThreeInputs,
  } = useStore();

  function moveToCommunityValidation(index: any) {
    const item = stageTwoInputs[index];

    const newStageTwoInputs = [...stageTwoInputs];
    newStageTwoInputs.splice(index, 1);
    setStageTwoInputs(newStageTwoInputs);

    const newStageThreeInputs = [
      ...stageThreeInputs,
      { ...item, NoOfYesVotes: 0, NoOfNoVotes: 0 },
    ];
    setStageThreeInputs(newStageThreeInputs);
  }

  return (
    <div className="flex flex-col">
      <main className="flex-1 overflow-auto p-6 md:p-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {stageTwoInputs.map((input, index) => (
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
                <Button variant="outline" className="w-full">
                  Vouch
                </Button>
                <Button
                  onClick={() => {
                    moveToCommunityValidation(index);
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
