import { verifyAdmin } from "@/http/middlewares/verifiy-admin";
import { makeDeleteDepartmentUseCase } from "@/usecases/factories/departments/make-delete-department.usecase";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const deleteDepartmentController: FastifyPluginAsyncZod = async (app) => {
  app.delete("/departments/:departmentId", {
    onRequest: [verifyAdmin],
    schema: {
      tags: ["departments"],
      summary: "Delete a department by ID",
      params: z.object({
        departmentId: z.string().uuid("Invalid department ID"),
      }),
      response: {
        200: z.object({
          department: z.object({
            id: z.string().uuid(),
            name: z.string(),
            description: z.string().nullable().optional(),
            createdByUserId: z.string().uuid(),
            createdAt: z.string(),
            updatedAt: z.string(),
          }),
        }),
      },
    },
  }, async (request, reply) => {
    const { departmentId } = request.params;

    const deleteDepartmentUseCase = makeDeleteDepartmentUseCase();

    const { department } = await deleteDepartmentUseCase.execute({ departmentId });

    reply.status(200).send({
      department: {
        ...department,
        createdAt: department.createdAt.toISOString(),
        updatedAt: department.updatedAt.toISOString(),
      },
    });
  });
};
