import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./createCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("should be able to create  a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Car name test",
            description: "car description teste",
            daily_rate: 100,
            license_plate: "abc-123",
            fine_amount: 100,
            brand: "brand test",
            category_id: "category id test",
        });

        expect(car).toHaveProperty("id");
    });

    it("should not be able to create a car with existent license plate", async () => {
        await createCarUseCase.execute({
            name: "Car name test",
            description: "car description teste",
            daily_rate: 100,
            license_plate: "abc-123",
            fine_amount: 100,
            brand: "brand test",
            category_id: "category id test",
        });

        await expect(async () => {
            await createCarUseCase.execute({
                name: "Car name test 2",
                description: "car description teste",
                daily_rate: 100,
                license_plate: "abc-123",
                fine_amount: 100,
                brand: "brand test",
                category_id: "category id test",
            });
        }).rejects.toEqual(new AppError("Car already exists"));
    });

    it("should be able to create  a new car available by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Car name test",
            description: "car description teste",
            daily_rate: 100,
            license_plate: "abc-123",
            fine_amount: 100,
            brand: "brand test",
            category_id: "category id test",
        });

        expect(car.available).toBe(true);
    });
});
