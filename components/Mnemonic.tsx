"use client";
import { mnemonic } from "@/lib/mnemonic";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { UserStore } from "@/lib/store";
import { Accounts } from "./Accounts";
import { Seed } from "@/actions/seedParse";

export const Mnemonic = ({
  onContinue,
}: {
  onContinue: (data: {
    privateKeyBase58: string;
    publicKeyBase58: string;
    id: number
  }) => void;
}) => {
  const [words, setWords] = useState<string[]>([]);
  const [userCopied, setUserCopied] = useState(false);
  const [firstData, setFirstData] = useState<
    {
      id: number;
      privateKeyBase58: string;
      publicKeyBase58: string;
    }[]
  >([]);

  const { toast } = useToast();

  const {
    setMnemonic,
    setUserCopiedMnemonic,
    userCopiedMnemonic,
    setSeedData,
    seedData,
  } = UserStore();

  useEffect(() => {
    function getRandomWords(arr: string[], count = 12) {
      const shuffled = arr.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }

    const randomWords = getRandomWords(mnemonic);

    setMnemonic(randomWords);
    setWords(randomWords);
  }, [setMnemonic]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(words.join(" "));
      toast({
        description: "Copied",
      });
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  async function handleContinue() {
    const data = await Seed(1, words.join(" "));
    // setSeedData({ ...data, id: 1 });
    // setFirstData((prev) => [...prev, { ...data, id: seedData.length }]);
    // setUserCopiedMnemonic(true);
    // setUserCopied(true);

    onContinue({...data , id :1});
  }

  if (userCopiedMnemonic || userCopied) {
    return (
      <Accounts
        id={seedData[0].id}
        privateKey={seedData[0].privateKeyBase58}
        publicKey={seedData[0].publicKeyBase58}
      />
    );
  }

  return (
    <main className="flex justify-center items-center w-full h-screen flex-wrap dark">
      <Card className="w-[350px] h-[550px] mx-auto shadow-lg">
        <CardHeader className="text-center text-balance">
          <span className="font-semibold text-2xl">Secret Recovery Phrase</span>
          <CardDescription className="text-yellow-500">
            This phrase is the ONLY way to recover your wallet. Do NOT share it
            with anyone!
          </CardDescription>
        </CardHeader>
        <CardContent
          className="w-full grid grid-cols-3 gap-4  my-auto mt-4 mx-auto blur-sm hover:blur-none cursor-pointer select-none"
          onClick={handleCopy}
        >
          {words.map((word, id) => (
            <div key={id} className="">
              <div className="text-center ">
                <Badge className="p-2 w-[100px] rounded-sm text-center ">
                  {id + 1}. {word}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="mt-4 font-semibold font-serif ">
          <span className="text-center text-sm font-semibold font-serif w-full ">
            Click anywhere to copy
          </span>
        </CardFooter>
        <CardFooter className="flex justify-center">
          <Button onClick={handleContinue}>Continue</Button>
        </CardFooter>
      </Card>
    </main>
  );
};
