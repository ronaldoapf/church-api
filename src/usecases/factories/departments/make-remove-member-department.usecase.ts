import { PrismaDepartmentsRepository } from "@/repositories/prisma/prisma-departments.repository";
import { PrismaMembersRepository } from "@/repositories/prisma/prisma-members.repository";
import { MakeRemoveMemberDepartmentUseCase } from "@/usecases/departments/remove-member-department/remove-member-department.usecase";

export function makeRemoveMemberDepartmentUseCase() {
  const departmentRepository = new PrismaDepartmentsRepository();
  const memberRepository = new PrismaMembersRepository();
  const removeMemberDepartmentUseCase = new MakeRemoveMemberDepartmentUseCase(departmentRepository, memberRepository);

  return removeMemberDepartmentUseCase;
}