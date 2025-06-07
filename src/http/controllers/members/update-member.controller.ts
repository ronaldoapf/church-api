import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { makeUpdateMemberUseCase } from "@/usecases/factories/members/make-update-member.usecase copy";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const updateMemberController: FastifyPluginAsyncZod = async (app) => {
  app.patch("/members/:memberId", 
    { 
      onRequest: [verifyJwt],
      schema: {
        tags: ["members"],
        summary: "Update a member",
        params: z.object({
          memberId: z.string().uuid().describe("The unique identifier of the member to update")
        }),
        body: z.object({
          name: z.string().optional(),
          birthDate: z.date().optional(),
          status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
          phone: z.string().optional(),
          address: z.string().optional(),
        })
      },
      
    }, async (request, reply) => {
      const { memberId } = request.params
      const { body } = request

      console.log(memberId)

      const updateMemberUseCase = await makeUpdateMemberUseCase()

      await updateMemberUseCase.execute({
        memberId,
        data: body
      })
      reply.status(204).send()
  })
}