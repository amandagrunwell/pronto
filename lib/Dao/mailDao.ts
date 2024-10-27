import prisma from "../prisma";

export async function addMailServices(data: any) {
  const res = await prisma.emailAccounts.create({ data });
  return res;
}

export async function getMailServices() {
  const res = await prisma.emailAccounts.findMany({
    where: { isGood: true },
    orderBy: { expires: "asc" },
  });
  return res;
}
