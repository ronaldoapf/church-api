import { prisma } from "@/lib/prisma";
import type { Event, Prisma } from "@prisma/client";
import type { EventsRepository } from "../events.repository";

export class PrismaEventsRepository implements EventsRepository {
  async create(
    data: Omit<Prisma.EventCreateInput, "createdBy">,
    createdById: string
  ): Promise<Event> {
    const event = await prisma.event.create({
      data: {
        ...data,
        createdBy: {
          connect: {
            id: createdById,
          },
        },
      },
    });

    return event;
  }

  async findById(id: string): Promise<Event | null> {
    return prisma.event.findUnique({
      where: { id },
    });
  }

  async findMany(): Promise<Event[] | null> {
    return prisma.event.findMany();
  }

  async delete(id: string): Promise<Event> {
    const event = await prisma.event.findUnique({
      where: { id },
    });
  
    if (!event) {
      throw new Error("Event not found.");
    }

    return await prisma.event.delete({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.EventUpdateInput): Promise<Event> {
    const event = await prisma.event.update({
      where: {
        id
      },
      data
    })

    return event
  }
}