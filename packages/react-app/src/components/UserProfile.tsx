import { ToastAction } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Client as GQL_Client, cacheExchange, fetchExchange } from "@urql/core";
import { ethers } from "ethers";
import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";
import { useAccount } from "wagmi";
import SkillVouchContract from "../../artifacts/contracts/SkillVouchContract.sol/SkillVouchContract.json";
import SkillVouchNFT from "../../artifacts/contracts/SkillVouchNFT.sol/SkillVouchNFT.json";
import { GET_ACCEPTED, GET_REQ_BY_USER } from "../../constants/subgraphQueries";
import { useEthersProvider, useEthersSigner } from "../lib/ethers";
import { pinFileToIPFS, uploadJSONToIPFS } from "../lib/uploadToIPFS";
import { useStore } from "../store/store";
import { NFTGlareCard } from "./NFTGlareCard";
import { SkillVouchDialog } from "./SkillVouchDialog";

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
interface PinataReturns {
  success: boolean;
  data: string;
}

const UserProfile = () => {
  const { address } = useAccount();
  const componentRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();

  const providerT: ethers.JsonRpcProvider =
    useEthersProvider() as ethers.JsonRpcProvider;
  // setProvider(providerT);

  const signerT: ethers.JsonRpcSigner =
    useEthersSigner() as ethers.JsonRpcSigner;

  const contractT = new ethers.Contract(
    "0x4ffFa4B9Ac841BEf20910caE3d2F52A9D85F4314",
    SkillVouchContract.abi,
    signerT
  );

  const contractNFT = new ethers.Contract(
    "0xe8B56B64b258Ac548c2FfBD8fD7cBbBa7f500436",
    SkillVouchNFT.abi,
    signerT
  );

  const {
    setLinkedInLink,
    setGithubLink,
    setContract,
    contract,
    triggeredToast,
    setTriggeredToast,
  } = useStore();
  useEffect(() => {
    if (contract) {
      return;
    }
    setContract(contractT);
  });

  console.log(contractT, "contractT");
  console.log(signerT, "signerT");
  console.log(providerT, "providerT");
  // const [linkedInLink, setLinkedInLink] = useState(
  //   "https://www.linkedin.com/in/johndoe"
  // );
  // const [githubLink, setGithubLink] = useState("https://github.com/johndoe");
  // const [iconPrompt, setIconPrompt] = useState("User");

  const APIURL =
    "https://api.studio.thegraph.com/query/77624/skillvouchdao/0.0.4";

  const [acceptedReqs, setAcceptedReqs] = useState<RequestCreated[]>([]);
  const [metadataURL, setMetadataURL] = useState<string>("");

  const queryData = async () => {
    const client = new GQL_Client({
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

  // const initialize = () => {
  //   const providerT: ethers.JsonRpcProvider =
  //     getEthersProvider() as ethers.JsonRpcProvider;
  //   // setProvider(providerT);

  //   const signerT: ethers.JsonRpcSigner =
  //     getEthersSigner() as ethers.JsonRpcSigner;
  //   // const contractT = new ethers.Contract(
  //   //   "0xCfB9fCb9b6395B92673C4B15fA8aaDA81dC450b4",
  //   //   SkillVouchContract.abi,
  //   //   signerT
  //   // );

  //   // setContract(contractT);
  //   // setSigner(signerT);
  //   // setProvider(providerT);

  //   // console.log(contractT);
  //   console.log(signerT);
  //   console.log(providerT);

  //   // contractT.mintTokensToNewUsers();
  //   // if (window.ethereum == null) {
  //   //   // If MetaMask is not installed, we use the default provider,
  //   //   // which is backed by a variety of third-party services (such
  //   //   // as INFURA). They do not have private keys installed,
  //   //   // so they only have read-only access
  //   //   console.log("MetaMask not installed; using read-only defaults");
  //   //   setProvider(ethers.getDefaultProvider());
  //   // } else {
  //   //   // Connect to the MetaMask EIP-1193 object. This is a standard
  //   //   // protocol that allows Ethers access to make all read-only
  //   //   // requests through MetaMask.
  //   //   const providerT = new ethers.BrowserProvider(window.ethereum);
  //   //   // It also provides an opportunity to request access to write
  //   //   // operations, which will be performed by the private key
  //   //   // that MetaMask manages for the user.

  //   //   // "0x966efc9A9247116398441d87085637400A596C3F",
  //   // }
  // };

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

      const client = new GQL_Client({
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

  useEffect(() => {
    if (acceptedReqs.length === 0 && !triggeredToast && !metadataURL) return;
    toast({
      title: "SkillVouch Verified NFT.",
      description: "Mint your SkillVouch NFT on the Zora Network.",
      action: (
        <ToastAction altText="MINT 🔥" onClick={handleCapture}>
          Mint it! 🔥
        </ToastAction>
      ),
    });

    setTriggeredToast(true);
  }, [acceptedReqs]);

  useEffect(() => {
    if (metadataURL === "") return;

    toast({
      title: "Your SkillVouch NFT Minted!.",
      description: "Checkout your SkillVouch NFT's Metadata.",
      action: (
        <ToastAction
          altText="checkout"
          onClick={() => window.open(metadataURL, "_blank")}
        >
          Check Out
        </ToastAction>
      ),
    });
  }, [metadataURL]);

  const saveChanges = async (
    skills: string,
    POW: string,
    selectedPOW: string,
    stakeAmount: string,
    linkedin: string,
    github: string
  ): Promise<void> => {
    // const stakeAmount = "21"; // Set the stake amount
    // const stakeAmountEth = ethers.parseUnits(stakeAmount, 18);

    // const stakeAmountWei = ethers.parseEther(stakeAmount); // Convert to Wei

    if (selectedPOW == "Experience")
      await contractT.createRequest(
        skills,
        "",
        POW,
        Number(stakeAmount),
        linkedin,
        github
      );
    else
      await contractT.createRequest(
        skills,
        POW,
        "",
        Number(stakeAmount),
        linkedin,
        github
      );

    // setStageOneInputs([
    //   ...stageOneInputs,
    //   {
    //     skills: skills,
    //     POW: POW,
    //     selectedPOW: selectedPOW,
    //     linkedin: linkedin,
    //     github: github,
    //   },
    // ]);
    setLinkedInLink(linkedin);
    setGithubLink(github);

    // setFetch(true);
  };

  const base64ToBlob = (base64: string): Blob => {
    const byteString = atob(base64.split(",")[1]);
    const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const blobToFile = (blob: Blob, fileName: string): File => {
    return new File([blob], fileName, { type: blob.type });
  };

  const captureComponent = async () => {
    const element = componentRef.current;
    const canvas = await html2canvas(element!);
    const dataUrl = canvas.toDataURL("image/png");
    console.log(dataUrl); // This is your captured image URL
    return dataUrl;
  };

  const handleCapture = async () => {
    const imageUrl = await captureComponent();
    const blob = base64ToBlob(imageUrl);
    const file = blobToFile(blob, "image.png");
    const arr: string[] = [];
    acceptedReqs.map((req) =>
      req.skill
        .split(",")
        .map((skill: string) => skill.trim())
        .map((skill: string) => arr.push(skill))
    );

    const response = await pinFileToIPFS(file);

    const jsonData = {
      name: "SkillVouch NFT",
      description: "NFT representing validated skills on SkillVouchDAO",
      attributes: {
        skills: arr,
      },
      img: response,
    };
    const res: PinataReturns = await uploadJSONToIPFS(jsonData);
    console.log(response, "IMG");
    console.log(res.data, "JSON");

    console.log(address, "ADDRS");
    await contractNFT.safeMint(res.data);

    setMetadataURL(res.data);

    // Upload imageUrl to IPFS and mint NFT here
  };

  return (
    <div className="flex flex-col items-center">
      <Toaster />
      <main className="flex justify-center items-center p-10 m-8">
        {/* Build lamps <br /> the right way */}
        <div ref={componentRef}>
          <NFTGlareCard acceptedReqs={acceptedReqs} />
        </div>
        {/* <div className="grid gap-2">
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
            </div> */}
      </main>

      <div className="flex justify-center">
        <SkillVouchDialog saveChanges={saveChanges} />
      </div>
    </div>
  );
};

export default UserProfile;

// function CheckIcon(props: any) {
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
//       <path d="M20 6 9 17l-5-5" />
//     </svg>
//   );
// }

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

// function GithubIcon(props: any) {
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
//       <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
//       <path d="M9 18c-4.51 2-5-2-7-2" />
//     </svg>
//   );
// }

// function LinkedinIcon(props: any) {
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
//       <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
//       <rect width="4" height="12" x="2" y="9" />
//       <circle cx="4" cy="4" r="2" />
//     </svg>
//   );
// }
