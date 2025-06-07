import type { FastifyInstance } from "fastify"
import { authenticateWithPasswordController } from "./authenticate-with-password"

export const AuthModule = (app: FastifyInstance) => {
  app.register(authenticateWithPasswordController)
}