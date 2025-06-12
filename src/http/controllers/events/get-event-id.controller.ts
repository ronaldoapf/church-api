import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { makeGetEventIdUseCase } from "@/usecases/factories/events/make-get-event-id.usecase";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const getEventIdController: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/events/:eventId",
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ["events"],
        summary: "Get event by ID",
        description: "Retrieve a single event by its ID.",
        params: z.object({
          eventId: z.string().uuid("Invalid UUID format"),
        }),
        response: {
          200: z.object({
            id: z.string().uuid(),
            name: z.string(),
            description: z.string(),
            date: z.date(),
            address: z.string(),
          }),
        }   
      },
    },
    async (request, reply) => {
      const { eventId } = request.params;

      const getEventIdUseCase = makeGetEventIdUseCase();
      const event = await getEventIdUseCase.execute({ eventId });

      return reply.status(200).send(event);
    }
  );
};
