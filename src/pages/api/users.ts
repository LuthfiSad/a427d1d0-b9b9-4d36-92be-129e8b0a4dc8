import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

interface UpdateUserRequest {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  phone: string;
  email: string;
}

interface ApiResponse<T> {
  status: string;
  code: number;
  data?: T;
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<any>>
) {
  switch (req.method) {
    case "GET":
      try {
        const users = await prisma.user.findMany();
        res.status(200).json({
          status: "success",
          code: 200,
          data: users,
          message: "Users fetched successfully",
        });
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
          status: "error",
          code: 500,
          message: "Failed to fetch users",
        });
      }
      break;

    case "PUT":
      const updatedUsers: UpdateUserRequest[] = req.body;

      try {
        await Promise.all(
          updatedUsers.map(async (user) => {
            return await prisma.user.update({
              where: { id: user.id },
              data: {
                firstName: user.firstName,
                lastName: user.lastName,
                position: user.position,
                phone: user.phone,
                email: user.email,
              },
            });
          })
        );

        res.status(200).json({
          status: "success",
          code: 200,
          message: "Users updated successfully",
        });
      } catch (error) {
        console.error("Error updating users:", error);
        res.status(500).json({
          status: "error",
          code: 500,
          message: "Failed to update users",
        });
      }
      break;

    case "DELETE":
      const { id }: { id: number } = req.body;

      try {
        await prisma.user.delete({
          where: { id },
        });
        res.status(200).json({
          status: "success",
          code: 200,
          message: "User deleted successfully",
        });
      } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({
          status: "error",
          code: 500,
          message: "Failed to delete user",
        });
      }
      break;

    default:
      res.status(405).json({
        status: "error",
        code: 405,
        message: "Method not allowed",
      });
      break;
  }
}
