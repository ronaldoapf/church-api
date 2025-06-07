import { PrismaMembersRepository } from "@/repositories/prisma/prisma-members.repository";
import { DeleteMemberUseCase } from "@/usecases/members/delete-member/delete-member.usecase";

export function makeDeleteMemberUseCase() {
  const memberRepository = new PrismaMembersRepository()
  const deleteMembers = new DeleteMemberUseCase(memberRepository)

  return deleteMembers;
}