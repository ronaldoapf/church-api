import type { MembersRepository } from "@/repositories/members.repository";
import type { Member } from "@prisma/client";

interface GetMemberProfileRequestUseCase {
  memberId: string
}

interface GetMemberProfileResponseUseCase {
  member: Member
}

export class GetMemberProfileUseCase {
  constructor(private readonly membersRepository: MembersRepository) {}

  async execute({ memberId }: GetMemberProfileRequestUseCase): Promise<GetMemberProfileResponseUseCase> {
    const member = await this.membersRepository.findById(memberId);

    if (!member) {
      throw new Error("Member not found");
    }

    return { member };
  }
}