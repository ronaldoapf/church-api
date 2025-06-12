import type { EventsRepository } from "@/repositories/events.repository";
import type { Event } from "@prisma/client";

interface GetEventIdRequestUseCase {
  eventId: string;
}

export class MakeGetEventIdUseCase {
  constructor(
    private readonly eventsRepository: EventsRepository,
  ) {}

  async execute({ eventId }: GetEventIdRequestUseCase): Promise<Event> {
    const event = await this.eventsRepository.findById(eventId);

    if (!event) {
      throw new Error("Event not found.");
    }

    return event;
  }
}
