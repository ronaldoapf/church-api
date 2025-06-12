import type { Prisma, Event } from "@prisma/client";

export interface EventsRepository {
  findMany(): Promise<Event[] | null>;
  create(
    data: Omit<Prisma.EventCreateInput, "createdBy">,
    createdById: string
  ): Promise<Event>;
  findById(id: string): Promise<Event | null>;
  delete(id: string): Promise<Event>
}