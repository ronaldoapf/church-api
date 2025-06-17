import { FastifyInstance } from "fastify";
import { registerDepartmentController } from "./register-department.controller";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { verifyAdmin } from "@/http/middlewares/verifiy-admin";

export const DepartmentModule = (app: FastifyInstance) => {
    app.addHook("onRequest", verifyJwt);
    app.addHook("onRequest", verifyAdmin);
    
    app.register(registerDepartmentController);
}