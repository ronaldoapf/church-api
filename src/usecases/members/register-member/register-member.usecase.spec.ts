import { comparePasswords } from "@/lib/bcrypt";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryMembersRepository } from "../../../repositories/in-memory/in-memory-members.repository";
import { RegisterMemberUseCase } from "./register-member.usecase";

const user = {
  password: "12345678w",
  email: "johndoe@acme.com",
  name: "John Doe"
}

describe("RegisterMemberUseCase", () => {
  let membersRepository: InMemoryMembersRepository;
  let sut: RegisterMemberUseCase;

  beforeEach(() => {
    membersRepository = new InMemoryMembersRepository();
    sut = new RegisterMemberUseCase(membersRepository);
  });

  it("should be able to register a member", async () => {
    const password = "12345678w"
    const email = "johndoe@acme.com"

    const result = await sut.execute({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: "John Doe",
        email,
      })
    );
  });

  it("should hash the member password upon registration", async () => {
    const member = await sut.execute({
      email: user.email,
      name: user.name,
      password: user.password,
    });

    const isPasswordCorrectlyHashed = await comparePasswords(user.password, member.passwordHash)

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register a member with an existing email", async () => {
    await sut.execute({
      email: user.email,
      name: user.name,
      password: user.password,
    });

    await expect(() => 
      sut.execute({
        name: user.name,
        email: user.email,
        password: user.password,
      })
    ).rejects.toThrow("Member with this email already exists");
  });
});