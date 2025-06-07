import { hashPassword } from '@/lib/bcrypt';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryMembersRepository } from '../../../repositories/in-memory/in-memory-members.repository';
import { AuthenticateWithPasswordUseCase } from './authenticate-with-password.usecase';

describe('AuthenticateWithPasswordUseCase', () => {
  let membersRepository: InMemoryMembersRepository;
  let sut: AuthenticateWithPasswordUseCase;

  beforeEach(() => {
    membersRepository = new InMemoryMembersRepository();
    sut = new AuthenticateWithPasswordUseCase(membersRepository);
  });


  it("should be able to authenticate", async() => {
    const password = "12345678w"
    const email = "johndoe@acme.com"

    const passwordHash = await hashPassword(password)
    
    await membersRepository.create({
      email,
      passwordHash,
      name: "John Doe",
    })

    const authUser = await sut.execute({
      email,
      password
    })

    expect(authUser.accessToken).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '12345',
      }),
    ).rejects.toThrow('Invalid credentials');
  })

 it('should not be able to authenticate with wrong password', async () => {
    const password = "12345678w"
    const email = "johndoe@acme.com"

    const passwordHash = await hashPassword(password)

    await membersRepository.create({
      email,
      passwordHash,
      name: "John Doe",
    })
    
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '12345',
      }),
    ).rejects.toThrow('Invalid credentials');
  })
});