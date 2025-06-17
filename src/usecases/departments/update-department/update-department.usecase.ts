import { DepartmentsRepository } from "@/repositories/departments.repository";
import type { Department, Prisma } from "@prisma/client";

interface UpdateDepartmentRequestUseCase {
  departmentId: string
  data: Prisma.DepartmentUpdateInput
}

interface UpdateDepartmentResponseUseCase {
  department: Department;
}

export class MakeUpdateDepartmentUseCase {
  constructor(
    private readonly departmentsRepository: DepartmentsRepository,
  ) {}

  async execute({ 
    departmentId, data
   }: UpdateDepartmentRequestUseCase): Promise<UpdateDepartmentResponseUseCase> {
    const department = await this.departmentsRepository.findById(departmentId)

    if(!department) {
      throw new Error("Member not found");
    }

    const updatedDepartment = await this.departmentsRepository.update(departmentId, data);

    return { department: updatedDepartment };
  }
}