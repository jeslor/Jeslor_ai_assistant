import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
  var isPrismaConnected: boolean | undefined;
}

const prisma = global.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
  global.isPrismaConnected = global.isPrismaConnected ?? false;
}

export default prisma;

export const connectToDatabase = async () => {
  try {
    if (!global.isPrismaConnected) {
      await prisma.$connect();
      global.isPrismaConnected = true;
      console.log("✅ Connected to the database");
    } else {
      console.log("ℹ️ Prisma is already connected");
    }
  } catch (error) {
    console.error("❌ Error connecting to the database:", error);
  }
};

export const disconnectFromDatabase = async () => {
  try {
    if (global.isPrismaConnected) {
      await prisma.$disconnect();
      global.isPrismaConnected = false;
      console.log("🔌 Disconnected from the database");
    }
  } catch (error) {
    console.error("❌ Error disconnecting from the database:", error);
  }
};
