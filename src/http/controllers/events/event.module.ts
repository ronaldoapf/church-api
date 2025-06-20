import type { FastifyInstance } from "fastify";
import { registerEventController } from "./register-event.controller";
import { getEventIdController } from "./get-event-id.controller";
import { getEventsController } from "./get-events.controller";
import { deleteEventController } from "./delete-event.controller";
import { updateEventController } from "./update-event.controller";
import { verifyJwt } from "@/http/middlewares/verify-jwt";

export const EventModule = (app: FastifyInstance) => {

  app.addHook("onRequest", verifyJwt);

  app.register(registerEventController)
  app.register(getEventIdController)
  app.register(getEventsController)
  app.register(deleteEventController)
  app.register(updateEventController)
}