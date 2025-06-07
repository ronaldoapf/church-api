import type { Member, Prisma } from "@prisma/client";

export type FindManyPagination = {
  birthDate?: Date;
  status?: string;
  page: number;
  limit: number;
}

export interface MembersRepository {
  findManyPagination(filter: FindManyPagination): Promise<Member[] | null>;
  findById(id: string): Promise<Member | null>;
  findByEmail(email: string): Promise<Member | null>;
  update(id: string, data: Prisma.MemberUpdateInput): Promise<Member>;
  create(data: Prisma.MemberCreateInput): Promise<Member>;
}