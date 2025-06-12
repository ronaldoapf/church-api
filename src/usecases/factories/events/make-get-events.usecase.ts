import { PrismaEventsRepository } from "@/repositories/prisma/prisma-events.repository";
import { MakeGetEventsUseCase } from "@/usecases/events/make-get-events/make-get-events.usecase";

export function makeGetEventsUseCase() {
  const eventRepository = new PrismaEventsRepository();
  const makeEventsUseCase = new MakeGetEventsUseCase(eventRepository);

  return makeEventsUseCase;
}