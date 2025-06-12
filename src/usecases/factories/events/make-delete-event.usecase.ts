import { PrismaEventsRepository } from "@/repositories/prisma/prisma-events.repository";
import { DeleteEventUseCase } from "@/usecases/events/delete-event/delete-event.usecase";

export function makeDeleteEventUseCase() {
  const eventRepository = new PrismaEventsRepository();
  const deleteEvents = new DeleteEventUseCase(eventRepository);

  return deleteEvents;
}