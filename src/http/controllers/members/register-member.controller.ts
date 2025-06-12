import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { makeRegisterMemberUseCase } from "@/usecases/factories/members/make-register-member.usecase";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const registerMemberController: FastifyPluginAsyncZod = async (app) => {
  app.post("/members", 
    { 
      schema: {
        tags: ["members"],
        summary: "Register a new member",
        body: z.object({
          name: z.string().min(1, "Name is required"),
          email: z.string().email("Invalid email format"),
          password: z.string().min(6, "Password must be at least 6 characters long")
        }),
        response: {
          201: z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(6),
          })
        }
      },
      
    }, async (request, reply) => {
    const { name, email, password } = request.body;

    const registerMemberUseCase = makeRegisterMemberUseCase()

    await registerMemberUseCase.execute({
      name, 
      email, 
      password
    })

    reply.status(201).send({ name, email, password })
  })
}