import type { EventsRepository } from "@/repositories/events.repository";
import type { Event } from "@prisma/client";

interface DeleteEventRequestUseCase {
  eventId: string
}

interface DeleteEventResponseUseCase {
  event: Event
}

export class DeleteEventUseCase {
  constructor(private readonly eventsRepository: EventsRepository) {}

  async execute({ eventId }: DeleteEventRequestUseCase): Promise<DeleteEventResponseUseCase> {
    const event = await this.eventsRepository.findById(eventId);

    if (!event) {
      throw new Error("Event not found");
    }

    const deletedEvent = await this.eventsRepository.delete(eventId);

    return { event: deletedEvent };
  }
}
