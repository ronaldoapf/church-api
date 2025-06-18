import { DepartmentsRepository } from "@/repositories/departments.repository";
import { MembersRepository } from "@/repositories/members.repository";
import type { Department } from "@prisma/client";

interface RemoveMemberToDepartmentUseCase {
    departmentId: string;
    memberId: string;
}

export class MakeRemoveMemberDepartmentUseCase {
    constructor(
        private readonly departmentsRepository: DepartmentsRepository,
        private readonly membersRepository: MembersRepository,
    ) { }

    async execute({ departmentId, memberId }: RemoveMemberToDepartmentUseCase): Promise<Department> {
        const department = await this.departmentsRepository.findById(departmentId);

        if (!department) throw new Error("Department not found.");

        const member = await this.membersRepository.findById(memberId);
        
        if (!member) throw new Error("Member not found.");

        const updatedDepartment = await this.departmentsRepository.removeMemberToDepartment(departmentId, memberId);

        return updatedDepartment;
    }

}
