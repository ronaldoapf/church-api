import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { verifyOwner } from "@/http/middlewares/verify-owner";
import { makeUpdateEventUseCase } from "@/usecases/factories/events/make-update-event.usecase";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const updateEventController: FastifyPluginAsyncZod = async (app) => {
  app.patch(
    "/events/:eventId",
    {
      onRequest: [verifyJwt, verifyOwner],
      schema: {
        tags: ["events"],
        summary: "Update an event",
        params: z.object({
          eventId: z.string().uuid().describe("The unique identifier of the event to update"),
        }),
        body: z.object({
          name: z.string().optional(),
          description: z.string().optional(),
          date: z.string().datetime().optional(),
          address: z.string().optional(),
        }),
      },
    },
    async (request, reply) => {
      const { eventId } = request.params;
      const { body } = request;

      const updateEventUseCase = await makeUpdateEventUseCase();

      await updateEventUseCase.execute({
        eventId,
        data: body,
      });

      reply.status(204).send();
    }
  );
};
