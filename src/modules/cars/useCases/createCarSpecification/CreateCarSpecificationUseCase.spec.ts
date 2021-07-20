import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMmory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationRepositoryInMmory = new SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationRepositoryInMmory
        );
    });
    it("should not be able to add a new specification to a non-existant car", async () => {
        const car_id = "123";
        const specifications_id = ["456"];

        await expect(async () => {
            await createCarSpecificationUseCase.execute({
                car_id,
                specifications_id,
            });
        }).rejects.toEqual(new AppError("Car does not exists"));
    });

    it("should be able to add a new specification to the car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car name test",
            description: "car description teste",
            daily_rate: 100,
            license_plate: "abc-123",
            fine_amount: 100,
            brand: "brand test",
            category_id: "category id test",
        });

        const specification = await specificationRepositoryInMmory.create({
            description: "test",
            name: "test",
        });

        const specifications_id = [specification.id];

        const specficationsCars = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id,
        });

        expect(specficationsCars).toHaveProperty("specifications");
        expect(specficationsCars.specifications.length).toBe(1);
    });
});
