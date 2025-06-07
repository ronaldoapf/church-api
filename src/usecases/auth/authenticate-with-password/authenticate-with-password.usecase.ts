import { comparePasswords } from "@/lib/bcrypt";
import type { MembersRepository } from "@/repositories/members.repository";
import type { Member } from "@prisma/client";

interface AuthenticateWithPasswordRequestUseCase {
  email: string;
  password: string;
}

interface AuthenticateWithPasswordResponseUseCase {
  member: Member
}

export class AuthenticateWithPasswordUseCase {
  constructor(private readonly membersRepository: MembersRepository) {}

  async execute({ email, password }: AuthenticateWithPasswordRequestUseCase): Promise<AuthenticateWithPasswordResponseUseCase> {
    const existingMember = await this.membersRepository.findByEmail(email);

    if (!existingMember) {
      throw new Error("Invalid credentials");
    }
    
    const { passwordHash } = existingMember
    
    const isPasswordValid = await comparePasswords(password, passwordHash)

    if(!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    return { member: existingMember }
  }
}