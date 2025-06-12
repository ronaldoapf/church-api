import type { FastifyInstance } from "fastify";
import { registerEventController } from "./register-event.controller";

export const EventModule = (app: FastifyInstance) => {
  app.register(registerEventController)
}