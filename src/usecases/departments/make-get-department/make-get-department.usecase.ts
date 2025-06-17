import { DepartmentsRepository } from "@/repositories/departments.repository";
import type { EventsRepository } from "@/repositories/events.repository";
import type { Department, Event } from "@prisma/client";

interface GetDepartmentIdRequestUseCase {
  departmentId: string;
}

export class MakeGetDepartmentUseCase {
  constructor(
    private readonly departmentsRepository: DepartmentsRepository,
  ) {}

  async execute({ departmentId }: GetDepartmentIdRequestUseCase): Promise<Department> {
    const departments = await this.departmentsRepository.findById(departmentId);

    if (!departments) {
      throw new Error("Department not found.");
    }

    return departments;
  }
}
