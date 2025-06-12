import type { EventsRepository } from "@/repositories/events.repository";
import type { MembersRepository } from "@/repositories/members.repository";
import type { Event } from "@prisma/client";

interface RegisterEventRequestUseCase {
  memberId: string;
  name: string;
  description: string;
  date: Date;
  address: string;
}

interface RegisterEventResponseUseCase {
  event: Event;
}

export class RegisterEventUseCase {
  constructor(
    private readonly eventsRepository: EventsRepository,
    private readonly membersRepository: MembersRepository,
  ) {}

  async execute({
    memberId,
    name,
    description,
    date,
    address,
  }: RegisterEventRequestUseCase): Promise<RegisterEventResponseUseCase> {
    const member = await this.membersRepository.findById(memberId);

    if (!member) {
      throw new Error("Member not found.");
    }

    const event = await this.eventsRepository.create({
      name,
      description,
      date,
      address,
    });

    return { event };
  }
}
