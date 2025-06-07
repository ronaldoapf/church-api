import { PrismaMembersRepository } from "@/repositories/prisma/prisma-members.repository";
import { RegisterMemberUseCase } from "@/usecases/members/register-member/register-member.usecase";

export function makeRegisterMemberUseCase() {
  const memberRepository = new PrismaMembersRepository()
  const registerMemberUseCase = new RegisterMemberUseCase(memberRepository)

  return registerMemberUseCase;
}