import { DepartmentsRepository } from "@/repositories/departments.repository";
import { Department, Prisma } from "@prisma/client";

interface RegisterDepartmentRequest {
  name: string;
  description?: string;
  createdByUserId: string; 
}

type RegisterDepartmentResponse = Department;

export class MakeRegisterDepartmentUseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

async execute(data: RegisterDepartmentRequest): Promise<RegisterDepartmentResponse> {
  const prismaData: Prisma.DepartmentCreateInput = {
    name: data.name,
    description: data.description,
    createdBy: {
      connect: { id: data.createdByUserId }
    }
  };

  return this.departmentsRepository.create(prismaData);
}

}

