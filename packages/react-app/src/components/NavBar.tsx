import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Stage, useStore } from "../store/store";
import { Menu } from "lucide-react";
// import { useStore } from "../store/store";
// import ConnectButton from "./ConnectButton";
import { LogoIcon } from "./Icons";
// import SearchBar from "./SearchBar";
import { ModeToggle } from "./mode-toggle";
import { buttonVariants } from "./ui/button";

import { ConnectAccount } from "@coinbase/onchainkit/wallet";
import { useAccount, useDisconnect } from "wagmi";
import {
  Avatar,
  Identity,
  Name,
  Badge,
  Address,
} from "@coinbase/onchainkit/identity";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { setStage } = useStore();
  const { address, status } = useAccount();
  const { disconnect } = useDisconnect();
  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between">
          <NavigationMenuItem className="font-bold flex">
            <a
              rel="noreferrer noopener"
              href="/"
              className="ml-2 font-bold text-xl flex"
            >
              <LogoIcon />
              SkillVouchDAO
            </a>
          </NavigationMenuItem>

          {/* mobile */}
          {/* <span className="flex md:hidden">
            <ModeToggle />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                >
                  <span className="sr-only">Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    Shadcn/React
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4"> */}
          {/* <a
                    rel="noreferrer noopener"
                    // href={}
                    // key={i}
                    onClick={() => {
                      if (!upload) setUpload(true);
                    }}
                    className={`text-[17px] ${buttonVariants({
                      variant: "ghost",
                    })}`}
                  >
                    Upload Listing
                  </a>
                  <a
                    rel="noreferrer noopener"
                    // href={}
                    // key={i}
                    onClick={() => {
                      if (!purchase) setPurchase(true);
                    }}
                    className={`text-[17px] ${buttonVariants({
                      variant: "ghost",
                    })}`}
                  >
                    Purchase
                  </a> */}
          {/* {routeList.map(({ href, label }: RouteProps) => (
                    <a
                      rel="noreferrer noopener"
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </a>
                  ))} */}
          {/* <a
                    rel="noreferrer noopener"
                    href="https://github.com/capGoblin/Xchange"
                    target="_blank"
                    className={`w-[110px] border ${buttonVariants({
                      variant: "secondary",
                    })}`}
                  >
                    <GitHubLogoIcon className="mr-2 w-5 h-5" />
                    Githsub
                  </a> */}
          {/* </nav>
              </SheetContent>
            </Sheet>
          </span> */}

          {/* desktop */}
          <NavigationMenuItem className="hidden md:flex gap-2">
            <a
              rel="noreferrer noopener"
              // href={}
              // key={i}
              // onClick={() => {
              //   if (!upload) setUpload(true);
              // }}
              onClick={() => {
                setStage(Stage.UserProfile);
              }}
              className={`text-[17px] ${buttonVariants({
                variant: "ghost",
              })}`}
            >
              Profile
            </a>
            <a
              rel="noreferrer noopener"
              // href={}
              // key={i}
              // onClick={() => {
              //   if (!purchase) setPurchase(true);
              // }}
              onClick={() => {
                setStage(Stage.VouchingProcess);
              }}
              className={`text-[17px] ${buttonVariants({
                variant: "ghost",
              })}`}
            >
              Vouching Process
            </a>
            <a
              rel="noreferrer noopener"
              // href={}
              // key={i}
              // onClick={() => {
              //   if (!upload) setUpload(true);
              // }}
              onClick={() => {
                setStage(Stage.CommunityValidation);
              }}
              className={`text-[17px] ${buttonVariants({
                variant: "ghost",
              })}`}
            >
              Community Validation
            </a>
            {/* {purchase && <SearchBar />} */}
            {/* {routeList.map((route: RouteProps, i) => (
              <a
                rel="noreferrer noopener"
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </a>
            ))} */}
          </NavigationMenuItem>
          <NavigationMenuItem className="flex gap-2">
            <div className="hidden md:flex gap-2">
              {(() => {
                if (status === "disconnected") {
                  return <ConnectAccount />;
                }
                return (
                  <div>
                    <Identity
                      address={address!}
                      schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
                      className="flex items-center gap-2"
                    >
                      <Avatar className="bg-slate-400 size-9" />
                      {/* <Badge /> */}
                      {/* <Name /> */}
                      <Address />
                    </Identity>

                    {/* <button type="button" onClick={() => disconnect()}> */}
                    {/* <Avatar address={address} /> */}
                    {/* </button> */}
                  </div>
                );
              })()}
            </div>
            <div className="py-2">
              <ModeToggle />
            </div>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
