import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient;
}

const prisma =
  process.env.NODE_ENV === "production"
    ? new PrismaClient()
    : global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  if (!global.prisma) {
    global.prisma = prisma;
  }
}

export default prisma;