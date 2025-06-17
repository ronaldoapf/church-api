import { verifyAdmin } from "@/http/middlewares/verifiy-admin";
import { makeRegisterDepartmentUseCase } from "@/usecases/factories/departments/make-register-department.usecase";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const registerDepartmentController: FastifyPluginAsyncZod = async (app) => {
  app.post("/departments",
    {
      onRequest: [verifyAdmin],
      schema: {
        tags: ["departments"],
        summary: "Register a new department",
        body: z.object({
          name: z.string().min(1, "Name is required"),
          description: z.string().optional(),
          createdByUserId: z.string().uuid("Invalid user ID"),
        }),
        response: {
          201: z.object({
            id: z.string().uuid(),
            name: z.string(),
            description: z.string().nullable().optional(),
            createdByUserId: z.string().uuid(),
            createdAt: z.string(),
            updatedAt: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, description, createdByUserId } = request.body;

      const registerDepartmentUseCase = makeRegisterDepartmentUseCase();

      const department = await registerDepartmentUseCase.execute({
        name,
        description,
        createdByUserId,
      });

      const departmentResponse = {
        ...department,
        createdAt: department.createdAt.toISOString(),
        updatedAt: department.updatedAt.toISOString(),
      };

      reply.status(201).send(departmentResponse);
    });
};
