import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implemantations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

describe("Authenticate User", () => {
    let authenticateUserUseCase: AuthenticateUserUseCase;
    let usersRepositoryInMemory: UsersRepositoryInMemory;
    let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
    let createUserUseCase: CreateUserUseCase;
    let dateProvider: IDateProvider;

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("should ne able to authenticate a user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "12345",
            email: "vitor.mendes93@gmail.com",
            password: "1234",
            name: "user test",
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate an nonexistent user", () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "fake@mail.com",
                password: "fake",
            });
        }).rejects.toEqual(new AppError("Email or password incorrect"));
    });

    it("should not be able to authenticate an valid email with incorrect password", async () => {
        const user: ICreateUserDTO = {
            driver_license: "12345",
            email: "vitor.mendes93@gmail.com",
            password: "1234",
            name: "user test password error",
        };

        await createUserUseCase.execute(user);
        await expect(async () => {
            await authenticateUserUseCase.execute({
                email: user.email,
                password: "fake password",
            });
        }).rejects.toEqual(new AppError("Email or password incorrect"));
    });
});
