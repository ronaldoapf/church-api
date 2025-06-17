import { DepartmentsRepository } from "@/repositories/departments.repository";
import type { Department } from "@prisma/client";

interface DeleteDepartmentRequestUseCase {
  departmentId: string
}

interface DeleteDepartmentResponseUseCase {
  department: Department
}

export class MakeDeleteDepartmentUseCase {
  constructor(private readonly departmentsRepository: DepartmentsRepository) {}

  async execute({ departmentId }: DeleteDepartmentRequestUseCase): Promise<DeleteDepartmentResponseUseCase> {
    const department = await this.departmentsRepository.findById(departmentId);

    if (!department) {
      throw new Error("Department not found");
    }

    const deletedDepartment = await this.departmentsRepository.delete(departmentId);

    return { department: deletedDepartment };
  }
}
