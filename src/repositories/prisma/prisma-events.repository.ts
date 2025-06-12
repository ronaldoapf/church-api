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

  async findById(id: string): Promise<Event | null> {
    const event = await prisma.event.findUnique({
      where: {
        id,
      }
    })

    if (!event) {
      return null;
    }

    return event;
  }

  async findMany(): Promise<Event[] | null> {
    const events = await prisma.event.findMany()

    if (!events) {
      return null;
    }

    return events;
  }
}