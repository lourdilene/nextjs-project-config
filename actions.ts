"use server";

import { PrismaClient } from "@prisma/client";
import { z } from "zod";
const prisma = new PrismaClient();

const DataLoadSchema = z.object({
  title: z.string().min(1),
  payload: z.any(),
});

export async function createDataLoad(formData: FormData) {
  const parsed = DataLoadSchema.safeParse({
    title: formData.get("title"),
    payload: JSON.parse(String(formData.get("payload") ?? "{}")),
  });
  if (!parsed.success) throw new Error("Invalid data");

  return prisma.dataLoad.create({ data: parsed.data });
}
