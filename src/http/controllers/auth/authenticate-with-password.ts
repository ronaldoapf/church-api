import { makeAuthenticateWithPasswordUseCase } from "@/usecases/factories/auth/make-authenticate-with-password.usecase";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const authenticateWithPasswordController: FastifyPluginAsyncZod = async (app) => {
  app.post("/auth/password", 
    {
      schema: {
        tags: ["auth"],
        summary: "Authenticate user with email and password",
        body: z.object({
          email: z.string().email("Invalid email format"),
          password: z.string().min(6, "Password must be at least 6 characters long")
        }),
        response: {
          200: z.object({
            token: z.string().describe("JWT token for authenticated user")
          })
        }
      }
    },
    async (request, reply) => {
      const { email, password } = request.body;

      const authenticateWithPasswordUseCase = makeAuthenticateWithPasswordUseCase();

      const { member } = await authenticateWithPasswordUseCase.execute({ 
        email, 
        password 
      })

      const token = await reply.jwtSign(
      {
        role: member.role,
      },
      {
        sign: {
          sub: member.id
        }
      })

      reply.status(200).send({ token });
  })
}