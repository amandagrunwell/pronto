import prisma from "../prisma";

export async function getMailServices() {
  const res = await prisma.emailAccounts.findMany({
    where: { isGood: true },
    orderBy: { expires: "asc" },
  });

  return res;
}
export async function getClientDetails(name: string) {
  const res = await prisma.clAccounts.findFirst({
    where: { name, isActive: true },
  });
  return res;
}

export async function getClNames() {
  const res = await prisma.clAccounts.findMany({ where: { isActive: true } });
  return res.map((cl) => cl.name);
}
