import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implemantations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;

describe("Send forgot mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        mailProviderInMemory = new MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProviderInMemory
        );
    });

    it("should be able to send a forgot password mail to user", async () => {
        const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");

        await usersRepositoryInMemory.create({
            driver_license: "606576",
            email: "buvi@zukmur.org",
            name: "Martin Harris",
            password: "1234",
        });

        await sendForgotPasswordMailUseCase.execute("buvi@zukmur.org");

        expect(sendMail).toHaveBeenCalled();
    });

    it("should not be able to send an email of user does not exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("do@cahdilzu.bm")
        ).rejects.toEqual(new AppError("User does not exists"));
    });

    it("should be able to crate token", async () => {
        const generateTokenMail = jest.spyOn(usersRepositoryInMemory, "create");

        usersRepositoryInMemory.create({
            driver_license: "613064",
            email: "vojom@sulhedab.dj",
            name: "hifenel@luvcim.gs",
            password: "1234",
        });

        await sendForgotPasswordMailUseCase.execute("vojom@sulhedab.dj");

        expect(generateTokenMail).toHaveBeenCalled();
    });
});
