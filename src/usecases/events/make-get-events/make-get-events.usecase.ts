import type { EventsRepository } from "@/repositories/events.repository";
import type { Event } from "@prisma/client";

export class MakeGetEventsUseCase {
  constructor(
    private readonly eventsRepository: EventsRepository,
  ) {}

  async execute(): Promise<Event[]> {
    const events = await this.eventsRepository.findMany();
  
    if (!events) {
      throw new Error("No events found.");
    }
  
    return events;
  }
}
