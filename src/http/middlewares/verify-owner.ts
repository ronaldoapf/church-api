import type { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "@/lib/prisma";

export async function verifyOwner(req: FastifyRequest, reply: FastifyReply) {
  const userId = req.user?.sub;
  const { eventId } = req.params as { eventId?: string };

  if (!userId || !eventId) {
    return reply.status(400).send({ error: "Missing user or event ID" });
  }

  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event) {
    return reply.status(404).send({ error: "Event not found" });
  }

  if (event.createdById !== userId) {
    return reply.status(403).send({ error: "Forbidden: You can only modify your own data" });
  }
}
