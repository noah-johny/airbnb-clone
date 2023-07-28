import { PrismaClient } from "@prisma/client";

// Declaring prisma as a global variable which is an instance of PrismaClient
declare global {
  var prisma: PrismaClient | undefined;
}

// Assigning client the existing instance of PrismaClient or create a new one
const client = globalThis.prisma || new PrismaClient();

// Reassigning prisma the client instance, if in development mode
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = client;
}

export default client;
