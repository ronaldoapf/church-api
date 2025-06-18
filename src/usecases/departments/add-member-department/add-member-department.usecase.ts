import { DepartmentsRepository } from "@/repositories/departments.repository";
import { MembersRepository } from "@/repositories/members.repository";
import type { Department } from "@prisma/client";

interface AddMemberToDepartmentUseCase {
    departmentId: string;
    memberId: string;
}

export class MakeAddMemberDepartmentUseCase {
    constructor(
        private readonly departmentsRepository: DepartmentsRepository,
        private readonly membersRepository: MembersRepository,
    ) { }

    async execute({ departmentId, memberId }: AddMemberToDepartmentUseCase): Promise<Department> {
        const department = await this.departmentsRepository.findById(departmentId);

        if (!department) throw new Error("Department not found.");

        const member = await this.membersRepository.findById(memberId);

        if (!member) throw new Error("Member not found.");

        const updatedDepartment = await this.departmentsRepository.addMemberToDepartment(departmentId, memberId);

        return updatedDepartment;
    }

}
