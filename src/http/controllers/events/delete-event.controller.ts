import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { verifyOwner } from "@/http/middlewares/verify-owner";
import { makeDeleteEventUseCase } from "@/usecases/factories/events/make-delete-event.usecase";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const deleteEventController: FastifyPluginAsyncZod = async (app) => {
  app.delete("/events/:eventId", 
    { 
      onRequest: [verifyJwt, verifyOwner],
      schema: {
        tags: ["events"],
        summary: "Delete a event",
        params: z.object({
          eventId: z.string().uuid()
        })
        
      },
      
    }, async (request, reply) => {

      const { eventId } = request.params;

      const deleteEventUseCase = makeDeleteEventUseCase()

      await deleteEventUseCase.execute({
        eventId
      })

      reply.status(204).send()
  })
}