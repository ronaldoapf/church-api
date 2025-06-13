import { verifyAdmin } from "@/http/middlewares/verifiy-admin";
import { makeRegisterEventUseCase } from "@/usecases/factories/events/make-register-events.usecase";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const registerEventController: FastifyPluginAsyncZod = async (app) => {
  app.post("/events",
    {
      onRequest: [verifyAdmin],
      schema: {
        tags: ["events"],
        summary: "Register a new event",
        body: z.object({
          name: z.string().min(1, "Name is required"),
          description: z.string().min(1, "Description is required"),
          date: z.coerce.date({
            required_error: "Date is required",
            invalid_type_error: "Invalid date format",
          }),
          address: z.string().min(1, "Address is required"),
        }),
        response: {
          201: z.object({
            id: z.string().uuid(),
            name: z.string(),
            description: z.string(),
            date: z.date(),
            address: z.string(),
            createdAt: z.date(),
            updatedAt: z.date(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, description, date, address } = request.body;
      const memberId = request.user.sub; 

      const registerEventUseCase = makeRegisterEventUseCase();

      const { event } = await registerEventUseCase.execute({
        memberId,
        name,
        description,
        date,
        address,
      });

      return reply.status(201).send(event);
    }
  );
};
