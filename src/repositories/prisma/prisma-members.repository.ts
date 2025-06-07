import { prisma } from "@/lib/prisma";
import type { Member, Prisma } from "@prisma/client";
import type { FindManyPagination, MembersRepository } from "../members.repository";

type CalculatePaginationProps = {
  page: number
  limit: number
}

export function calculatePagination({ page, limit }: CalculatePaginationProps) {
  return {
    skip: (page - 1) * limit,
  }
}


export class PrismaMembersRepository implements MembersRepository {
  async update(id: string, data: Prisma.MemberUpdateInput): Promise<Member> {
    const member = await prisma.member.update({
      where: {
        id
      },
      data
    })

    return member
  }


  async findManyPagination(filter: FindManyPagination): Promise<Member[] | null> {
    const { page, status, birthDate, limit } = filter

    const skip = (page - 1) * limit;

    const omit = {
      password: true
    }
    const where = {}
     
    if(status) { 
      where.status = status
    }

    if(birthDate) {
      where.birthDate = birthDate
    }

    const [data, total] = await Promise.all([
      prisma.member.findMany({
        skip,
        where,
        take: limit,
      }),
      prisma.member.count({ where }),
    ])

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }
  }

  async findById(id: string): Promise<Member | null> {
    const member = await prisma.member.findUnique({
      where: {
        id
      },
    })

    if(!member) {
      return null
    }

    return member
  }

  async findByEmail(email: string): Promise<Member | null> {
    const member = await prisma.member.findUnique({
      where: {
        email,
      },
    })

    return member
  }

  async create(data: Prisma.MemberCreateInput): Promise<Member> {
    const member = await prisma.member.create({
      data 
    })

    return member
  }
  

}