import type { MembersRepository } from "@/repositories/members.repository";
import type { Member } from "@prisma/client";

interface DeleteMemberRequestUseCase {
  memberId: string
}

interface DeleteMemberResponseUseCase {
  member: Member
}

export class DeleteMemberUseCase {
  constructor(private readonly membersRepository: MembersRepository) {}

  async execute({ 
    memberId
   }: DeleteMemberRequestUseCase): Promise<DeleteMemberResponseUseCase> {
    const member = await this.membersRepository.findById(memberId)

    if(!member) {
      throw new Error("Member not found");
    }

    await this.membersRepository.update(member.id, {
      status: "INACTIVE"
    })

    return { member };
  }
}