import type { FastifyInstance } from "fastify"
import { deleteMemberController } from "./delete-member.controller"
import { getMemberProfileController } from "./get-member-profile.controller"
import { getMembersController } from "./get-members.controller"
import { registerMemberController } from "./register-member.controller"
import { updateMemberController } from "./update-member.controller"

export const MemberModule = (app: FastifyInstance) => {
  app.register(getMemberProfileController)
  app.register(getMembersController)
  app.register(registerMemberController)
  app.register(updateMemberController)
  app.register(deleteMemberController)

}