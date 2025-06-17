import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { makeGetEventsUseCase } from "@/usecases/factories/events/make-get-events.usecase";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const getEventsController: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/events",
    {
      schema: {
        tags: ["events"],
        summary: "Get events",
        description: "Retrieve a list all events.",
        response: {
          200: z.array(
            z.object({
              id: z.string().uuid(),
              name: z.string(),
              description: z.string(),
              date: z.date(),
              address: z.string(),
            })
          ),
        },        
      },
    },
    async (request, reply) => {
      const getEventsUseCase = makeGetEventsUseCase();
      const events = await getEventsUseCase.execute();

      return reply.status(200).send(events);
    }
  );
};
