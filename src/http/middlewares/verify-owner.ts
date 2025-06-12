import type { FastifyReply, FastifyRequest } from "fastify";

export async function verifyOwner(req: FastifyRequest, reply: FastifyReply) {
  const userId = req.user?.sub;
  const memberId = (req.params as { memberId?: string }).memberId;

  if (!userId || !memberId || userId !== memberId) {
    return reply.status(403).send({ error: "Forbidden: You can only modify your onw data" });
  }
}