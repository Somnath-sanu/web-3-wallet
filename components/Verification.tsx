"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { checkPassword, CheckUserExist, createUser } from "./actions";
import { Loader2 } from "lucide-react";
import { UserStore } from "@/lib/store";
import { Mnemonic } from "./Mnemonic";
import { WalletManager } from "./WalletManager";

export default function Verification() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const {
    isUserExist,
    setIsUserExist,
    isUserVerified,
    setIsUserVerified,
    setMnemonic,
    seedData,
    setSeedDataDeletion,
    setSelectedAccountId,
  } = UserStore();

  useEffect(() => {
    CheckUserExist().then((data) => {
      if (!data) {
        setIsUserExist(false);
        setIsUserVerified(false);
        setMnemonic([]);
        setSelectedAccountId(0);
        setSeedDataDeletion([]);
      } else {
        setIsUserExist(data);
      }
    });
  }, [loading]);

  const handleSubmitForNewUser = async () => {
    if (!password || !confirmPassword) {
      toast({
        description: "Invalid",
        variant: "destructive",
      });

      return;
    }

    if (password.length < 4 || confirmPassword.length < 4) {
      toast({
        description: "Password must be at least 4 characters",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        description: "Password and confirmPassword doesn't match",
        variant: "destructive",
      });
      return;
    }

    if (!isUserExist) {
      setLoading(true);
      const data = await createUser(password);

      toast({
        description: "Success",
      });
      setLoading(false);
      setPassword("");
      setConfirmPassword("");
    }
  };

  const verifyAccount = async () => {
    if (password.length < 4) {
      toast({
        description: "Password must be at least 4 characters",
        variant: "destructive",
      });
      return;
    }

    if (!password) {
      toast({
        description: "Invalid",
        variant: "destructive",
      });

      return;
    }

    setLoading(true);
    const data = await checkPassword(password);
    if (data) {
      toast({
        description: "Verified",
      });
      setIsUserVerified(true);
    } else {
      toast({
        description: "password is Incorrect",
        variant: "destructive",
      });
    }

    setLoading(false);
    setPassword("");
  };

  if (isUserVerified) {
    return <WalletManager />;
  }

  return (
    <Card className="w-[350px] h-[550px] mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl text-slate-700">
          Shanu&apos;s Wallet
        </CardTitle>
        <Separator className="mt-2" />
      </CardHeader>
      <CardContent>
        <Image
          src={`/fox-gif.gif`}
          alt="gif"
          width={300}
          height={300}
          className="bg-transparent border-none outline-none overflow-hidden"
        />
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password" className="text-xl font-semibold">
                Enter password
              </Label>
              <Input
                id="password"
                type="password"
                className="text-sm p-2"
                placeholder="Enter password"
                required
                min={4}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            {!isUserExist && (
              <div className="flex flex-col space-y-1.5">
                <Label
                  htmlFor="confirm password"
                  className="text-xl font-semibold"
                >
                  Confirm password
                </Label>
                <Input
                  id="confirm password"
                  type="password"
                  className="text-sm p-2"
                  placeholder="Confirm password"
                  required
                  min={4}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
              </div>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between items-center w-full">
        {isUserExist ? (
          <Button
            variant="default"
            className="mx-auto flex gap-2"
            type="submit"
            onClick={verifyAccount}
            disabled={loading}
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {isUserExist ? "Verify account" : "Create Account"}
          </Button>
        ) : (
          <Button
            variant="default"
            className="mx-auto flex gap-2"
            type="submit"
            onClick={handleSubmitForNewUser}
            disabled={loading}
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {isUserExist ? "Verify account" : "Create Account"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
