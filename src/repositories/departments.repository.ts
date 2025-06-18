import type { Department, Prisma } from "@prisma/client";

export type FindDepartmentsPagination = {
  page: number;
  limit: number;
  name?: string;
}

export interface DepartmentsRepository {
  findManyPagination(filter: FindDepartmentsPagination): Promise<{
    data: Department[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;
  findById(id: string): Promise<Department | null>;
  delete(id: string): Promise<Department>;
  create(data: Prisma.DepartmentCreateInput): Promise<Department>;
  update(id: string, data: Prisma.DepartmentUpdateInput): Promise<Department>;
  addMemberToDepartment(departmentId: string, memberId: string): Promise<Department>;
  removeMemberToDepartment(departmentId: string, memberId: string): Promise<Department>;
}
