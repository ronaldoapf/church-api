import { verifyAdmin } from "@/http/middlewares/verifiy-admin";
import { makeGetDepartmentsUseCase } from "@/usecases/factories/departments/make-get-departments.usecase";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const getDepartmentsController: FastifyPluginAsyncZod = async (app) => {
  app.get("/departments", {
    onRequest: [verifyAdmin],
    schema: {
      tags: ["departments"],
      summary: "Get all departments",
      description: "Retrieve a list of all departments in the system.",
      querystring: z.object({
        page: z.number({ coerce: true }).default(1).describe("Page number for pagination"),
        limit: z.number({ coerce: true }).int().min(1).max(100).default(10).describe("Number of departments per page"),
      }),
    },
  }, async (request, reply) => {
    const { limit, page } = request.query;

    const getDepartmentsUseCase = makeGetDepartmentsUseCase();

    const departments = await getDepartmentsUseCase.execute({
      page,
      limit,
    });

    reply.status(200).send(departments);
    console.log(departments);
  });
};
