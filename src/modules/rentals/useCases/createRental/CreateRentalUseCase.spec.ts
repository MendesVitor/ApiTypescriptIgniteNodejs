import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implemantations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();

    beforeAll(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayjsProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayjsProvider,
            carsRepositoryInMemory
        );
    });

    it("should be able to create a new rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car name test",
            description: "car description teste",
            daily_rate: 100,
            license_plate: "abc-123",
            fine_amount: 100,
            brand: "brand test",
            category_id: "category id test",
        });

        const rental = await createRentalUseCase.execute({
            user_id: "1234",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to create a new rental if there is another rental to the same user", async () => {
        await rentalsRepositoryInMemory.create({
            user_id: "1234",
            car_id: "123",
            expected_return_date: dayAdd24Hours,
        });

        await expect(async () => {
            await createRentalUseCase.execute({
                user_id: "1234",
                car_id: "1234",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toEqual(new AppError("user already has a rental"));
    });

    it("should not be able to create a new rental if there is another rental to the same car", async () => {
        await rentalsRepositoryInMemory.create({
            user_id: "12345",
            car_id: "123",
            expected_return_date: dayAdd24Hours,
        });

        await expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "123",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toEqual(new AppError("car is unavailable"));
    });

    it("should not be able to create a new rental with invalid return time", async () => {
        await expect(async () => {
            await createRentalUseCase.execute({
                user_id: "vitor",
                car_id: "1234",
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toEqual(new AppError("Invalid return time"));
    });
});
