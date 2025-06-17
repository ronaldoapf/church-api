import { PrismaDepartmentsRepository } from "@/repositories/prisma/prisma-departments.repository";
import { MakeRegisterDepartmentUseCase } from "@/usecases/departments/register-department/register-department.usecase";

export function makeRegisterDepartmentUseCase() {
    const departmentRepository = new PrismaDepartmentsRepository();
    const registerDepartmentUseCase = new MakeRegisterDepartmentUseCase(departmentRepository);

    return registerDepartmentUseCase;
}