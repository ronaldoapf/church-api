import { PrismaMembersRepository } from "@/repositories/prisma/prisma-members.repository";
import { AuthenticateWithPasswordUseCase } from "@/usecases/auth/authenticate-with-password/authenticate-with-password.usecase";

export const makeAuthenticateWithPasswordUseCase = () => {
  const membersRepository = new PrismaMembersRepository();
  const authenticateWithPasswordUseCase = new AuthenticateWithPasswordUseCase(membersRepository);

  return authenticateWithPasswordUseCase
}