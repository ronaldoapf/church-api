import { PrismaDepartmentsRepository } from "@/repositories/prisma/prisma-departments.repository";
import { PrismaMembersRepository } from "@/repositories/prisma/prisma-members.repository";
import { MakeAddMemberDepartmentUseCase } from "@/usecases/departments/add-member-department/add-member-department.usecase";

export function makeAddMemberDepartmentUseCase() {
  const departmentRepository = new PrismaDepartmentsRepository();
  const memberRepository = new PrismaMembersRepository();
  const addMemberDepartmentUseCase = new MakeAddMemberDepartmentUseCase(departmentRepository, memberRepository);

  return addMemberDepartmentUseCase;
}