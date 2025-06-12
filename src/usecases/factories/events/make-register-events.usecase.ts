import { PrismaEventsRepository } from "@/repositories/prisma/prisma-events.repository";
import { PrismaMembersRepository } from "@/repositories/prisma/prisma-members.repository";
import { RegisterEventUseCase } from "@/usecases/events/register-event/register-event.usecase";

export function makeRegisterEventUseCase() {
  const eventRepository = new PrismaEventsRepository()
  const memberRepository = new PrismaMembersRepository()
  const registerEventUseCase = new RegisterEventUseCase(eventRepository, memberRepository);

  return registerEventUseCase;
}