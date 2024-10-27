import { bec } from "@prisma/client";
import prisma from "../prisma";

export async function getInfos() {
  const res = await prisma.bec.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
  return res;
}
export async function addInfos(data: any) {
  const res = await prisma.bec.create({ data });
  return res;
}

export async function updateInfos(data: Partial<bec>) {
  return await prisma.bec.update({
    where: { id: data.id },
    data,
  });
}

export async function updateInfoByEmail(email: string, data: Partial<bec>) {
  return await prisma.bec.update({ where: { cfo_email: email }, data });
}

export async function unsentInfos(limit: number) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-based index for months, so September is 8
  const dateAfter23rd = new Date(year, month, 23); // Date object for the 23rd of the current month

  return await prisma.bec.findMany({
    where: {
      isSent: false,
    },
    orderBy: {
      createdAt: "asc",
    },
    take: limit,
  });
}
