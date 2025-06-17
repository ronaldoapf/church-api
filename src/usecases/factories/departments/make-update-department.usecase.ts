import { PrismaDepartmentsRepository } from "@/repositories/prisma/prisma-departments.repository";
import { MakeUpdateDepartmentUseCase } from "@/usecases/departments/update-department/update-department.usecase";

export function makeUpdateDepartmentUseCase() {
  const departmentRepository = new PrismaDepartmentsRepository()
  const updateDepartmentUseCase = new MakeUpdateDepartmentUseCase(departmentRepository)

  return updateDepartmentUseCase;
}