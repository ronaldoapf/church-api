import { hashPassword } from "@/lib/bcrypt";
import type { MembersRepository } from "@/repositories/members.repository";
import type { Member } from "@prisma/client";

interface RegisterMemberRequestUseCase {
  name: string;
  email: string;
  password: string;
  birthDate: Date;
  birthMonth: number;
}

interface RegisterMemberResponseUseCase extends Member {}

export class RegisterMemberUseCase {
  constructor(private readonly membersRepository: MembersRepository) {}

  async execute({ name, email, password, birthDate, birthMonth }: RegisterMemberRequestUseCase): Promise<RegisterMemberResponseUseCase> {
    const existingMember = await this.membersRepository.findByEmail(email);

    if (existingMember) {
      throw new Error("Member with this email already exists");
    }

    const passwordHash = await hashPassword(password);
    
    const newMember = await this.membersRepository.create({
      name,
      email,
      passwordHash,
      birthDate,
      birthMonth,
      role: "MEMBER"
    });

    return newMember;
  }
}