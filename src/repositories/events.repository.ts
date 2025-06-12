import type { Prisma, Event } from "@prisma/client";

export interface EventsRepository {
  findMany(): Promise<Event[] | null>;
  create(data: Prisma.EventCreateInput): Promise<Event>;
  findById(id: string): Promise<Event | null>;
}