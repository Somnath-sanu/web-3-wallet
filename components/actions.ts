"use server";

import { prisma } from "@/lib/prisma";

import { cookies } from "next/headers";

export const CheckUserExist = async () => {
  const userId = cookies().get("userId")?.value as unknown;

  if (!userId) {
    return false;
  }

  const isUser = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!isUser) {
    return false;
  }

  return true;
};

export const createUser = async (password: string) => {
  try {
    const user = await prisma.user.create({
      data: {
        password,
      },
    });

    await cookies().set("userId", user.id);

    return {
      id: user.id,
      status: 200,
    };
  } catch (error) {
    console.log(error);

    return {
      status: 500,
    };
  }
};

export const checkPassword = async (password: string) => {
  const userId = cookies().get("userId")?.value as unknown;

  if (!userId) return false;

  const isPasswordCorrect = await prisma.user.findFirst({
    where: {
      id: userId,
      password,
    },
  });

  if (isPasswordCorrect) return true;

  return false;
};

// import fs from "fs";

// export const readFileContent = async () => {
//   fs.readFile("lib/mnemonic.txt", "utf-8", function (err, contents) {
//     if (err) {
//       console.log(err);

//     }
//     return contents;
//   });
// };

import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import nacl from "tweetnacl";
import { derivePath } from "ed25519-hd-key";
// import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";

export async function Seed(id: number, mnemonic: string) {
  const seed = mnemonicToSeedSync(mnemonic);

  const path = `m/44'/501'/${id}'/0'`; // derivation path

  const derivedSeed = derivePath(path, seed.toString("hex")).key;

  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;

  const privateKeyBase58 = bs58.encode(secret.slice(0, 32));
  console.log("Private key:", privateKeyBase58);
  const publicKeyBase58 = bs58.encode(secret.slice(32, 64));
  console.log("Public key:", publicKeyBase58);

  return {
    privateKeyBase58,
    publicKeyBase58,
  };
}
