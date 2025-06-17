import { makeUpdateDepartmentUseCase } from "@/usecases/factories/departments/make-update-department.usecase";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { verifyAdmin } from "@/http/middlewares/verifiy-admin";

export const updateDepartmentController: FastifyPluginAsyncZod = async (app) => {
  app.patch(
    "/departments/:departmentId",
    {
      onRequest: [verifyAdmin],
      schema: {
        tags: ["departments"],
        summary: "Update a department",
        params: z.object({
          departmentId: z.string().uuid("Invalid department ID"),
        }),
        body: z.object({
          name: z.string().min(1).optional(),
          description: z.string().nullable().optional(),
        }),
      },
    },
    async (request, reply) => {
      const { departmentId } = request.params;
      const body = request.body;

      const updateDepartmentUseCase = makeUpdateDepartmentUseCase();

      await updateDepartmentUseCase.execute({
        departmentId,
        data: body,
      });

      return reply.status(204).send();
    }
  );
};
