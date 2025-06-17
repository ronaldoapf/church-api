import { PrismaDepartmentsRepository } from "@/repositories/prisma/prisma-departments.repository";
import { MakeGetDepartmentsUseCase } from "@/usecases/departments/make-get-departments/make-get-departments.usecase";


export function makeGetDepartmentsUseCase() {
    const departmentRepository = new PrismaDepartmentsRepository();
    const getDepartmentsUseCase = new MakeGetDepartmentsUseCase(departmentRepository);

    return getDepartmentsUseCase;
}