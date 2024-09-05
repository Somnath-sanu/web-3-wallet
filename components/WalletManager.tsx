"use client";
import { useState } from "react";
import { Mnemonic } from "./Mnemonic";
import { Accounts } from "./Accounts";
import { UserStore } from "@/lib/store";
import { SheetUI } from "./SheetUI";

export const WalletManager = () => {
  const [accountData, setAccountData] = useState<null | {
    id: number;
    privateKeyBase58: string;
    publicKeyBase58: string;
  }>(null);
  const {
    setSeedData,
    seedData,
    selectedAccoundId,
    setSelectedAccountId,
    open,
    setOpen,
  } = UserStore();

  // const [selectedAccountId, setSelectedAccountId] = useState<number | null>(null);

  const handleMnemonicContinue = (data: {
    privateKeyBase58: string;
    publicKeyBase58: string;
    id: number;
  }) => {
    setSeedData({ ...data, id: 1 });
    setAccountData({ ...data, id: 1 });
    setSelectedAccountId(data?.id);
  };

  const handleAccountSelect = (accountId: number) => {
    console.log("clicked haha");

    setSelectedAccountId(accountId);
  };

  const selectedAccount = seedData?.find((acc) => acc.id === selectedAccoundId);

  return (
    <div>
      {seedData.length === 0 ? (
        <Mnemonic onContinue={handleMnemonicContinue} />
      ) : (
        <div>
          <SheetUI
            onAccountSelect={handleAccountSelect}
            open={open}
            setOpen={setOpen}
          />
          {selectedAccount && (
            <Accounts
              id={selectedAccount.id}
              privateKey={selectedAccount.privateKeyBase58}
              publicKey={selectedAccount.publicKeyBase58}
            />
          )}
        </div>
      )}
    </div>
  );
};
