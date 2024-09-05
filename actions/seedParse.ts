"use server";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import nacl from "tweetnacl";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
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
