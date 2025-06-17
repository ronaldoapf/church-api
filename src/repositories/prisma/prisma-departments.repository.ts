import { Department, Prisma } from "@prisma/client";
import { DepartmentsRepository, FindDepartmentsPagination } from "../departments.repository";
import { prisma } from "@/lib/prisma";

export class PrismaDepartmentsRepository implements DepartmentsRepository {
  async create(data: Prisma.DepartmentCreateInput): Promise<Department> {
      const department = await prisma.department.create({
          data,
      });

      return department;
  }

  async findById(id: string): Promise<Department | null> {
    const department = await prisma.department.findUnique({
      where: {
        id,
      }
    });

    if (!department) {
      return null;
    }

    return department;
  }

  async findManyPagination(filter: FindDepartmentsPagination) {
    const { page, limit, name } = filter;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (name) {
      where.name = {
        contains: name,
        mode: "insensitive",
      };
    }

    const [data, total] = await Promise.all([
      prisma.department.findMany({
        where,
        skip,
        take: limit,
      }),
      prisma.department.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async delete(id: string): Promise<Department> {
    const department = await prisma.department.findUnique({
      where: { id },
    });

    if (!department) {
      throw new Error("Department not found.");
    }

    return await prisma.department.delete({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.DepartmentUpdateInput): Promise<Department> {
    return await prisma.department.update({
      where: { id },
      data, 
    })
  }
}