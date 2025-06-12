import type { Member, Prisma } from "@prisma/client";
import type { FindManyPagination, MembersRepository } from "../members.repository";

export class InMemoryMembersRepository implements MembersRepository {
  public member: Member[] = []

  async findById(id: string): Promise<Member | null> {
    const member = this.member.find(member => member.id === id);
    return member || null;
  }

  async findByEmail(email: string): Promise<Member | null> {
    const member = this.member.find(member => member.email === email);
    return member || null;
  }

  async create(data: Prisma.MemberCreateInput): Promise<Member> {
    const newMember: Member = {
      id: crypto.randomUUID(),
      address: data.address || null,
      email: data.email,
      name: data.name,
      phone: data.phone || null,
      passwordHash: data.passwordHash,
      role: data.role || "MEMBER",
      baptismDate: data.baptismDate ? new Date(data.baptismDate) : null,
      birthDate: new Date(data.birthDate),
      birthMonth: data.birthMonth ?? 1, 
      status: data.status || "ACTIVE",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.member.push(newMember)

    return newMember
  }

}