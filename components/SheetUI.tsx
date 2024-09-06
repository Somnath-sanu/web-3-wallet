"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "./ui/badge";
import { MoveLeftIcon, PlusCircle } from "lucide-react";
import { Button } from "./ui/button";
import React, { useState } from "react";
import { UserStore } from "@/lib/store";
import { Seed } from "./actions";
import { Accounts } from "./Accounts";
import { ScrollArea } from "./ui/scroll-area";

export function SheetUI({
  onAccountSelect,
  children,
  open,
  setOpen,
}: {
  onAccountSelect: (accountId: number) => void;
  children?: React.ReactNode;
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  const { seedData, setSeedData, mnemonic } = UserStore();

  const [accountData, setAccountData] = useState<
    {
      id: number;
      privateKeyBase58: string;
      publicKeyBase58: string;
    }[]
  >(seedData || []);

  console.log(accountData);

  async function handleClick() {
    const len = seedData.length;

    const data = await Seed(len + 1, mnemonic.join(" "));
    setAccountData((prev) => [...prev, { ...data, id: len + 1 }]);
    setSeedData({ ...data, id: len + 1 });
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <ScrollArea className="">
        <SheetContent
          className=" w-[9rem]  flex flex-col justify-between overflow-y-auto bg-black"
          side={"left"}
        >
          <SheetHeader className="mt-7 pt-4">
            {accountData.length > 0 &&
              accountData.map((data, id) => (
                <SheetTitle
                  className="flex flex-col items-center justify-start border-b bg-slate-900 p-2 rounded-3xl truncate cursor-pointer"
                  key={id}
                  onClick={() => {
                    onAccountSelect(data.id);
                    console.log("clicked");
                  }}
                >
                  <Badge className="rounded-full w-fit h-fit">A{data.id}</Badge>
                  <span className="font-semibold text-sm">Account {data.id}</span>
                </SheetTitle>
              ))}
          </SheetHeader>

          <SheetFooter
            className="border-t pt-6 text-start w-full cursor-pointer "
            onClick={handleClick}
          >
            <PlusCircle size={26} className="mr-auto" />
          </SheetFooter>
        </SheetContent>
      </ScrollArea>
    </Sheet>
  );
}
