import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { makeGetMemberProfileUseCase } from "@/usecases/factories/members/make-get-member-profile.usecase";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const getMemberProfileController: FastifyPluginAsyncZod = async (app) => {
  app.get("/members/profile", {
    onRequest: [verifyJwt],
    schema: {
      tags: ["members"],
      
      response: {
        200: z.object({
          id: z.string(),
          name: z.string(),
          email: z.string().email(),
        })
      }
    }
  }, async (request, reply) => {
    const memberId = request.user.sub

    const getMemberProfileUseCase = makeGetMemberProfileUseCase()

    const { member } = await getMemberProfileUseCase.execute({
      memberId
    })

    return reply.status(200).send({ 
      id: member.id,
      name: member.name,
      email: member.email
    })
  })
}