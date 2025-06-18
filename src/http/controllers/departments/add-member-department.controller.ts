import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { verifyAdmin } from "@/http/middlewares/verifiy-admin";
import { makeAddMemberDepartmentUseCase } from "@/usecases/factories/departments/make-add-member-department.usecase";

export const addMemberToDepartmentController: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/departments/:departmentId/members/:memberId",
    {
      onRequest: [verifyAdmin],
      schema: {
        tags: ["departments"],
        summary: "Add a member to a department",
        params: z.object({
          departmentId: z.string().uuid("Invalid department ID"),
          memberId: z.string().uuid("Invalid member ID"),
        }),
      },
    },
    async (request, reply) => {
      const { departmentId, memberId } = request.params;

      const addMemberUseCase = makeAddMemberDepartmentUseCase();

      const department = await addMemberUseCase.execute({
        departmentId,
        memberId,
      });

      return reply.status(200).send(department);
    }
  );
};
