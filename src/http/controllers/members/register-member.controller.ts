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
          password: z.string().min(6, "Password must be at least 6 characters long"),
          birthDate: z.coerce.date({
            required_error: "Birth date is required",
            invalid_type_error: "Invalid date format"
          }),
          birthMonth: z.coerce.number({
            required_error: "Birth month is required",
            invalid_type_error: "Birth month must be a number"
          }).int().min(1, "Month must be between 1 and 12").max(12, "Month must be between 1 and 12"),          
        }),
        response: {
          201: z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(6),
            birthDate: z.date(),
            birthMonth: z.number().int().min(1).max(12),
          })
        }
      },
      
    }, async (request, reply) => {
    const { name, email, password, birthDate, birthMonth } = request.body;

    const registerMemberUseCase = makeRegisterMemberUseCase()

    await registerMemberUseCase.execute({
      name, 
      email, 
      password,
      birthDate,
      birthMonth
    })

    reply.status(201).send({ name, email, password, birthDate, birthMonth })
  })
}