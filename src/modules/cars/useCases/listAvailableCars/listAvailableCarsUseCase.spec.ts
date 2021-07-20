import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List all cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory
        );
    });

    it("Should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Car list test",
            daily_rate: 1000.0,
            license_plate: "xyz741",
            fine_amount: 10000,
            brand: "Car brand list test",
            category_id: "2200954d-561f-4350-aed8-2640799c8a79",
        });

        const cars = await listAvailableCarsUseCase.execute({});
        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car2",
            description: "Car list test",
            daily_rate: 1000.0,
            license_plate: "xyz741",
            fine_amount: 10000,
            brand: "Car brand list test",
            category_id: "2200954d-561f-4350-aed8-2640799c8a79",
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Car2",
        });

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car2",
            description: "Car list test",
            daily_rate: 1000.0,
            license_plate: "xyz741",
            fine_amount: 10000,
            brand: "Car brand list test",
            category_id: "2200954d-561f-4350-aed8-2640799c8a79",
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car brand list test",
        });

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car2",
            description: "Car list test",
            daily_rate: 1000.0,
            license_plate: "xyz741",
            fine_amount: 10000,
            brand: "Car brand list test",
            category_id: "12345",
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "12345",
        });

        expect(cars).toEqual([car]);
    });
});
