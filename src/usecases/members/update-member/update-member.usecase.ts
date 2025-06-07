import type { MembersRepository } from "@/repositories/members.repository";
import type { Member, Prisma } from "@prisma/client";

interface UpdateMemberRequestUseCase {
  memberId: string
  data: Prisma.MemberUpdateInput
}

interface UpdateMemberResponseUseCase {
  member: Member
}

export class UpdateMemberUseCase {
  constructor(private readonly membersRepository: MembersRepository) {}

  async execute({ 
    memberId, data
   }: UpdateMemberRequestUseCase): Promise<UpdateMemberResponseUseCase> {
    const member = await this.membersRepository.findById(memberId)

    if(!member) {
      throw new Error("Member not found");
    }


    await this.membersRepository.update(member.id, {
      ...data,
    })

    return { member };
  }
}