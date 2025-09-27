import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { title, payload } = req.body || {};
    const created = await prisma.dataLoad.create({ data: { title, payload } });
    return res.status(201).json(created);
  }
  if (req.method === "GET") {
    const items = await prisma.dataLoad.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.json(items);
  }
  return res.status(405).end();
}
