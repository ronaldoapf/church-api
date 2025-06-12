import type { FastifyInstance } from "fastify";
import { registerEventController } from "./register-event.controller";
import { getEventIdController } from "./get-event-id.controller";
import { getEventsController } from "./get-events.controller";

export const EventModule = (app: FastifyInstance) => {
  app.register(registerEventController)
  app.register(getEventIdController)
  app.register(getEventsController)
}