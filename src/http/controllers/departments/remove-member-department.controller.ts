import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { verifyAdmin } from "@/http/middlewares/verifiy-admin";
import { makeRemoveMemberDepartmentUseCase } from "@/usecases/factories/departments/make-remove-member-department.usecase";

export const removeMemberFromDepartmentController: FastifyPluginAsyncZod = async (app) => {
  app.delete(
    "/departments/:departmentId/members/:memberId",
    {
      onRequest: [verifyAdmin],
      schema: {
        tags: ["departments"],
        summary: "Remove a member from a department",
        params: z.object({
          departmentId: z.string().uuid("Invalid department ID"),
          memberId: z.string().uuid("Invalid member ID"),
        }),
      },
    },
    async (request, reply) => {
      const { departmentId, memberId } = request.params;

      const useCase = makeRemoveMemberDepartmentUseCase();

      await useCase.execute({ departmentId, memberId });

      return reply.status(204).send();
    }
  );
};
