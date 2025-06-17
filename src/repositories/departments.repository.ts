import { Department, Prisma } from "@prisma/client";

export interface DepartmentsRepository {
  create(data: Prisma.DepartmentCreateInput): Promise<Department>;
}