import fastify from 'fastify';
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider
} from 'fastify-type-provider-zod';

import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { env } from './env';
import { errorHandler } from './error-handler';
import { AuthModule } from './http/controllers/auth/auth.module';
import { MemberModule } from './http/controllers/members/member.module';
import { EventModule } from './http/controllers/events/event.module';
import { DepartmentModule } from './http/controllers/departments/department.module';

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'API',
      description: 'API documentation',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(fastifyCors, {
  origin: "*"
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET_KEY,
  sign: {
    expiresIn: '7d',
  }
})

app.register(AuthModule)
app.register(MemberModule)
app.register(EventModule)
app.register(DepartmentModule)