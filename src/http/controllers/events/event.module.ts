import type { FastifyInstance } from "fastify";
import { registerEventController } from "./register-event.controller";
import { getEventIdController } from "./get-event-id.controller";

export const EventModule = (app: FastifyInstance) => {
  app.register(registerEventController)
  app.register(getEventIdController)
}