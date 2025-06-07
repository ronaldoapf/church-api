import { hashPassword } from "@/lib/bcrypt";
import type { MembersRepository } from "@/repositories/members.repository";
import type { Member } from "@prisma/client";

interface RegisterMemberRequestUseCase {
  name: string;
  email: string;
  password: string;
}

interface RegisterMemberResponseUseCase extends Member {}

export class RegisterMemberUseCase {
  constructor(private readonly membersRepository: MembersRepository) {}

  async execute({ name, email, password }: RegisterMemberRequestUseCase): Promise<RegisterMemberResponseUseCase> {
    const existingMember = await this.membersRepository.findByEmail(email);

    if (existingMember) {
      throw new Error("Member with this email already exists");
    }

    const passwordHash = await hashPassword(password);
    
    // Create the new member with hashed password
    const newMember = await this.membersRepository.create({
      name,
      email,
      passwordHash
    });

    return newMember;
  }
}