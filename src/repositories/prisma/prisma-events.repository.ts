import { prisma } from "@/lib/prisma";
import type { Event, Prisma } from "@prisma/client";
import type { EventsRepository } from "../events.repository";

export class PrismaEventsRepository implements EventsRepository {
  async create(data: Prisma.EventCreateInput): Promise<Event> {
    const event = await prisma.event.create({
      data,
    })

    return event;
  }
}