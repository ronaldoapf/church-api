import { compare, hash } from "bcryptjs"

const HASHED_ROUNDS = 6

export async function hashPassword(unhashedPassword: string): Promise<string> {
  const passwordHash = await hash(unhashedPassword, HASHED_ROUNDS)

  return passwordHash
}

export async function comparePasswords(passwordToCompare: string, hashedPassword: string): Promise<boolean> {
  const isTheSamePassword = await compare(passwordToCompare, hashedPassword)

  return isTheSamePassword
}