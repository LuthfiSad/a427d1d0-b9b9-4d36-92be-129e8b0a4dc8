// prisma/seed.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const generateRandomUser = () => {
  const firstNames = ["John", "Jane", "Alice", "Bob", "Charlie", "Dave", "Eve"];
  const lastNames = ["Doe", "Smith", "Johnson", "Brown", "Davis", "Williams", "Miller"];
  const positions = ["Manager", "Developer", "Designer", "Tester", "Support", "DevOps", "HR"];

  const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const randomPosition = positions[Math.floor(Math.random() * positions.length)];
  const randomPhone = `${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`;
  const randomEmail = `${randomFirstName.toLowerCase()}.${randomLastName.toLowerCase()}@example.com`;

  return {
    firstName: randomFirstName,
    lastName: randomLastName,
    position: randomPosition,
    phone: randomPhone,
    email: randomEmail,
  };
};

const seed = async () => {
  try {
    for (let i = 0; i < 50; i++) {
      await prisma.user.create({
        data: generateRandomUser(),
      });
    }
    console.log("Seeding completed.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
