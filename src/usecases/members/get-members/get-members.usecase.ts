import type { MembersRepository } from "@/repositories/members.repository";
import type { Member } from "@prisma/client";

interface GetMembersRequestUseCase {
  birthDate?: Date;
  status?: string;
  page?: number;
  limit?: number;
}

interface GetMembersResponseUseCase {
  member: Member[]
}

export class GetMembersUseCase {
  constructor(private readonly membersRepository: MembersRepository) {}

  async execute({ 
    birthDate,
    status,
    page = 1,
    limit = 10
   }: GetMembersRequestUseCase): Promise<any> {
    const member = await this.membersRepository.findManyPagination({
      birthDate,
      status,
      page,
      limit
    });

    return member;
  }
}