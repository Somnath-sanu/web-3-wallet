"use server";

import { prisma } from "@/lib/prisma";

import { cookies } from "next/headers";

export const CheckUserExist = async () => {
  const userId = cookies().get("userId")?.value as unknown;

  console.log(userId);

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
