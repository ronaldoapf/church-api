import { Department, Prisma } from "@prisma/client";
import { DepartmentsRepository } from "../departments.repository";
import { prisma } from "@/lib/prisma";

export class PrismaDepartmentsRepository implements DepartmentsRepository {
    async create(data: Prisma.DepartmentCreateInput): Promise<Department> {
        const department = await prisma.department.create({
            data,
        });

        return department;
    }
}