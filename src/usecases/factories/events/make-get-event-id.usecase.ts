import { PrismaEventsRepository } from "@/repositories/prisma/prisma-events.repository";
import { MakeGetEventIdUseCase } from "@/usecases/events/make-get-event-id/make-get-event-id.usecase";

export function makeGetEventIdUseCase() {
  const eventRepository = new PrismaEventsRepository()
  const makeEventIdUseCase = new MakeGetEventIdUseCase(eventRepository);

  return makeEventIdUseCase;
}