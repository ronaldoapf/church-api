import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { makeGetMembersUseCase } from "@/usecases/factories/members/make-get-members.usecase";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const getMembersController: FastifyPluginAsyncZod = async (app) => {
  app.get("/members", {
    onRequest: [verifyJwt],
    schema: {
      tags: ["members"],
      summary: "Get all members",
      description: "Retrieve a list of all members in the system.",
      querystring: z.object({
        birthDate: z.date().optional().describe("Filter members by birth date"),
        status: z.enum(["ACTIVE", "INACTIVE"]).optional().default("ACTIVE").describe("Filter members by status"),
        page: z.number({ coerce: true }).default(1).describe("Page number for pagination"),
        limit: z.number({ coerce: true }).int().min(1).max(100).default(10).describe("Number of members per page")
      })
    }
  }, async (request, reply) => {
    const { limit, page, birthDate, status } = request.query 
    const getMembersUseCase = await makeGetMembersUseCase()

    const members = await getMembersUseCase.execute({
      birthDate,
      status,
      page,
      limit
    })

    reply.status(200).send(members)
    console.log(members)
  })
}
  