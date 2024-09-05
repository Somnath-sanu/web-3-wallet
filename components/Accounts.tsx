"use client";
import { Copy, CopyIcon, EyeIcon, Trash2 } from "lucide-react";
import { SendSection } from "./SendSection";
import { SheetUI } from "./SheetUI";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { Seed } from "@/actions/seedParse";
import { UserStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { Input } from "./ui/input";

export const Accounts = ({
  id,
  privateKey,
  publicKey,
}: {
  id: number;
  privateKey: string;
  publicKey: string;
}) => {
  const {
    mnemonic,
    seedData,
    setSeedData,
    selectedAccoundId,
    setSelectedAccountId,
    open,
    setOpen,
    setSeedDataDeletion,
  } = UserStore();

  const { toast } = useToast();

  function handleDelete(id: number) {
    toast({
      description: "Feature will come soon",
    });
    return;
    console.log(id);
    const UpdatedAccount = seedData?.filter(
      (acc) => acc.id !== selectedAccoundId
    );
    setSeedDataDeletion(UpdatedAccount);
  }
  return (
    <main className="flex justify-center items-center w-full h-screen flex-wrap dark">
      <Card className="w-[350px] h-[550px] mx-auto shadow-lg relative">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-neutral-100 flex gap-2">
            <SheetUI
              onAccountSelect={(id: number) => {
                setSelectedAccountId(id);
                setOpen(false);
              }}
              open={open}
              setOpen={setOpen}
            >
              <Badge
                className="rounded-full cursor-pointer"
                onClick={() => {
                  setOpen(true);
                }}
              >
                {" "}
                A{id}{" "}
              </Badge>
            </SheetUI>
            <span>Account {id}</span>
            <span title="public key" className="text-lg">
              <Copy
                className="size-4 cursor-pointer text-neutral-300 hover:text-neutral-50"
                onClick={async () => {
                  await navigator.clipboard.writeText(publicKey);
                  toast({
                    description: "Public key Copied 🙌",
                  });
                }}
              />
            </span>
            <span
              className="ml-auto"
              title="delete account"
              onClick={() => handleDelete(id)}
            >
              <Trash2 className="size-4 cursor-pointer hover:text-red-700" />
            </span>
          </CardTitle>
          <Separator className="mt-2" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 justify-center">
            <div className="text-4xl mx-auto">
              <p className="font-semibold">$0.00</p>
            </div>
            <div className="flex justify-center items-center gap-4">
              <p>+$0.00</p>
              <p className="p-2 bg-slate-700/45 rounded-2xl">+0.00%</p>
            </div>
          </div>
          <div className="flex mt-14">
            <SendSection />
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <div
              className="flex gap-1 justify-center items-center cursor-pointer  -translate-y-1"
              onClick={async () => {
                await navigator.clipboard.writeText(privateKey);
                toast({
                  description: "Private key copied",
                });
              }}
            >
              <p className="text-sm font-sans">Private Key</p>
              <span className="p-1 text-center">
                <CopyIcon className="size-4 hover:text-gray-300" />
              </span>
            </div>
            <Input
              type="text"
              value={privateKey}
              disabled
              className="blur-sm hover:blur-none cursor-pointer"
            />
          </div>
        </CardContent>
      </Card>
    </main>
  );
};
