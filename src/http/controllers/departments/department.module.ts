import { FastifyInstance } from "fastify";
import { registerDepartmentController } from "./register-department.controller";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { getDepartmentsController } from "./get-departments.controller";
import { getDepartmentController } from "./get-department.controller";
import { deleteDepartmentController } from "./delete-department.controller";
import { updateDepartmentController } from "./update-department.controller";

export const DepartmentModule = (app: FastifyInstance) => {
    app.addHook("onRequest", verifyJwt);
    
    app.register(registerDepartmentController);
    app.register(getDepartmentsController);
    app.register(getDepartmentController);
    app.register(deleteDepartmentController);
    app.register(updateDepartmentController);
}