import { verifyAdminOrSelf } from "@/http/middlewares/verify-admin-or-self";
import { makeDeleteMemberUseCase } from "@/usecases/factories/members/make-delete-member.usecase";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const deleteMemberController: FastifyPluginAsyncZod = async (app) => {
  app.delete("/members/:id", 
    { 
      onRequest: [verifyAdminOrSelf],
      schema: {
        tags: ["members"],
        summary: "Delete a member",
        params: z.object({
          id: z.string().uuid()
        })
        
      },
      
    }, async (request, reply) => {

      const { id } = request.params;

      const deleteMemberUseCase = makeDeleteMemberUseCase()

      await deleteMemberUseCase.execute({
        memberId: id
      })

      reply.status(204).send()
  })
}