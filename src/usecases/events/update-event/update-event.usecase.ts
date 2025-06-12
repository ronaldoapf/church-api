import type { EventsRepository } from "@/repositories/events.repository";
import type { MembersRepository } from "@/repositories/members.repository";
import type { Event, Prisma } from "@prisma/client";

interface UpdateEventRequestUseCase {
  eventId: string
  data: Prisma.EventUpdateInput
}

interface UpdateEventResponseUseCase {
  event: Event
}

export class UpdateEventUseCase {
  constructor(
    private readonly eventsRepository: EventsRepository,
  ) {}

  async execute({ 
    eventId, data
   }: UpdateEventRequestUseCase): Promise<UpdateEventResponseUseCase> {
    const event = await this.eventsRepository.findById(eventId)

    if(!event) {
      throw new Error("Member not found");
    }

    const updatedEvent = await this.eventsRepository.update(eventId, data);

    return { event: updatedEvent };
  }
}