import { PrismaDepartmentsRepository } from "@/repositories/prisma/prisma-departments.repository";
import { MakeDeleteDepartmentUseCase } from "@/usecases/departments/delete-department/delete-department.usecase";

export function makeDeleteDepartmentUseCase() {
  const departmentRepository = new PrismaDepartmentsRepository();
  const deleteDepartments = new MakeDeleteDepartmentUseCase(departmentRepository);

  return deleteDepartments;
}