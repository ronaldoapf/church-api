import { PrismaEventsRepository } from "@/repositories/prisma/prisma-events.repository";
import { UpdateEventUseCase } from "@/usecases/events/update-event/update-event.usecase";

export function makeUpdateEventUseCase() {
  const eventRepository = new PrismaEventsRepository();
  const updateEventUseCase = new UpdateEventUseCase(eventRepository);

  return updateEventUseCase;
}