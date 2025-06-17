import type { FastifyReply, FastifyRequest } from "fastify";

export async function verifyAdmin(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  try {
    await request.jwtVerify();

    if (request.user.role !== "ADMIN") {
      return reply.status(403).send({ error: "Forbidden: Admins only" });
    }
  } catch {
    return reply.status(401).send({ error: "Unauthorized" });
  }
}