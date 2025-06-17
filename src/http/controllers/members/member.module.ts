import type { FastifyInstance } from "fastify"
import { deleteMemberController } from "./delete-member.controller"
import { getMemberProfileController } from "./get-member-profile.controller"
import { getMembersController } from "./get-members.controller"
import { registerMemberController } from "./register-member.controller"
import { updateMemberController } from "./update-member.controller"
import { verifyJwt } from "@/http/middlewares/verify-jwt"

export const MemberModule = (app: FastifyInstance) => {
  app.register(async (app) => {
    app.addHook("onRequest", verifyJwt);

    app.register(getMemberProfileController);
    app.register(getMembersController);
    app.register(updateMemberController);
    app.register(deleteMemberController);
  });

  app.register(registerMemberController);

}