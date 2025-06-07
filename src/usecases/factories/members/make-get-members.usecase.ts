import { PrismaMembersRepository } from "@/repositories/prisma/prisma-members.repository";
import { GetMembersUseCase } from "@/usecases/members/get-members/get-members.usecase";

export function makeGetMembersUseCase() {
  const memberRepository = new PrismaMembersRepository()
  const getMembers = new GetMembersUseCase(memberRepository)

  return getMembers;
}