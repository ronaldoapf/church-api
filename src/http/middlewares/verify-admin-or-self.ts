import type { FastifyReply, FastifyRequest } from "fastify";

export async function verifyAdminOrSelf(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();

    const userId = request.user.sub; 
    const userRole = request.user.role;

    const { memberId } = request.params as { memberId: string };

    if (userRole === "ADMIN" || userId === memberId) {
      return; 
    }

    return reply.status(403).send({ error: "Forbidden: only admin or owner can update" });
  } catch {
    return reply.status(401).send({ error: "Unauthorized" });
  }
}
