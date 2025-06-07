import type { Invite, Prisma } from "@prisma/client";

export class InvitesRepository {
  createInvite(data: Prisma.InviteCreateInput): Promise<Invite>
}