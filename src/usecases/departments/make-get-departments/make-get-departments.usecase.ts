import type { DepartmentsRepository } from "@/repositories/departments.repository";
import type { Department } from "@prisma/client";

interface GetDepartmentsRequestUseCase {
  page?: number;
  limit?: number;
  name?: string;
}

interface GetDepartmentsResponseUseCase {
  data: Department[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class MakeGetDepartmentsUseCase {
  constructor(private readonly departmentsRepository: DepartmentsRepository) {}

  async execute({
    page = 1,
    limit = 10,
    name,
  }: GetDepartmentsRequestUseCase): Promise<GetDepartmentsResponseUseCase> {
    return this.departmentsRepository.findManyPagination({
      page,
      limit,
      name,
    });
  }
}
