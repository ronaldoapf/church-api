import { PrismaMembersRepository } from "@/repositories/prisma/prisma-members.repository";
import { GetMemberProfileUseCase } from "@/usecases/members/get-member-profile/get-member-profile.usecase";

export function makeGetMemberProfileUseCase() {
  const memberRepository = new PrismaMembersRepository()
  const getMemberProfileUseCase = new GetMemberProfileUseCase(memberRepository)

  return getMemberProfileUseCase;
}