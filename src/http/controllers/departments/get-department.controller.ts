import { makeGetDepartmentUseCase } from "@/usecases/factories/departments/make-get-department.usecase";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const getDepartmentController: FastifyPluginAsyncZod = async (app) => {
  app.get("/departments/:departmentId", {
    schema: {
      tags: ["departments"],
      summary: "Get department by ID",
      params: z.object({
        departmentId: z.string().uuid("Invalid department ID"),
      }),
      response: {
        200: z.object({
          department: z.object({
            id: z.string().uuid(),
            name: z.string(),
            description: z.string().nullable(),
            createdByUserId: z.string().uuid(),
            createdAt: z.string(),
            updatedAt: z.string(),
          }),
        }),
        404: z.object({
          message: z.string(),
        }),
      },
    },
  }, async (request, reply) => {
    const { departmentId } = request.params;

    const getDepartmentUseCase = makeGetDepartmentUseCase();

    try {
      const department = await getDepartmentUseCase.execute({ departmentId });

      return reply.send({
        department: {
          ...department,
          createdAt: department.createdAt.toISOString(),
          updatedAt: department.updatedAt.toISOString(),
        },
      });
    } catch (err) {
      if (err instanceof Error && err.message === "Department not found.") {
        return reply.status(404).send({ message: err.message });
      }

      throw err; 
    }
  });
};
