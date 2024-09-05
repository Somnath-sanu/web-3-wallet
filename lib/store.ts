import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface StoreProps {
  isUserExist: boolean;
  setIsUserExist: (value: boolean) => void;
  isUserVerified: boolean;
  setIsUserVerified: (value: boolean) => void;
  mnemonic: string[];
  setMnemonic: (value: string[]) => void;
  userCopiedMnemonic: boolean;
  setUserCopiedMnemonic: (value: boolean) => void;
  seedData: {
    id: number;
    privateKeyBase58: string;
    publicKeyBase58: string;
  }[];

  setSeedData: (value: {
    id: number;
    privateKeyBase58: string;
    publicKeyBase58: string;
  }) => void;

  selectedAccoundId: number | null;
  setSelectedAccountId: (value: number) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
  setSeedDataDeletion: (
    value: {
      id: number;
      privateKeyBase58: string;
      publicKeyBase58: string;
    }[]
  ) => void;
}

export const UserStore = create<StoreProps>()(
  persist(
    (set) => ({
      isUserExist: false,
      setIsUserExist: (value: boolean) => set({ isUserExist: value }),
      isUserVerified: false,
      setIsUserVerified: (value: boolean) => set({ isUserVerified: value }),
      mnemonic: [],
      setMnemonic: (value: string[]) => set({ mnemonic: value }),
      userCopiedMnemonic: false,
      setUserCopiedMnemonic: (value: boolean) =>
        set({ userCopiedMnemonic: value }),
      seedData: [],
      setSeedData: (value: {
        privateKeyBase58: string;
        publicKeyBase58: string;
        id: number;
      }) =>
        set((state) => ({
          seedData: [...state.seedData, value],
        })),
      selectedAccoundId: null,
      setSelectedAccountId: (value: number) =>
        set({ selectedAccoundId: value }),
      open: false,
      setOpen: (value: boolean) => set({ open: value }),
      setSeedDataDeletion(value) {
        set((prev) => ({
          seedData: [...value],
        }));
      },
    }),

    {
      name: "sanu-web3-wallet",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
