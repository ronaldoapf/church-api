import { PrismaMembersRepository } from "@/repositories/prisma/prisma-members.repository";
import { UpdateMemberUseCase } from "@/usecases/members/update-member/update-member.usecase";

export function makeUpdateMemberUseCase() {
  const memberRepository = new PrismaMembersRepository()
  const updateMemberUseCase = new UpdateMemberUseCase(memberRepository)

  return updateMemberUseCase;
}