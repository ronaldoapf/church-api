import { PrismaDepartmentsRepository } from "@/repositories/prisma/prisma-departments.repository";
import { MakeGetDepartmentUseCase } from "@/usecases/departments/make-get-department/make-get-department.usecase";


export function makeGetDepartmentUseCase() {
    const departmentRepository = new PrismaDepartmentsRepository();
    const getDepartmentUseCase = new MakeGetDepartmentUseCase(departmentRepository);

    return getDepartmentUseCase;
}