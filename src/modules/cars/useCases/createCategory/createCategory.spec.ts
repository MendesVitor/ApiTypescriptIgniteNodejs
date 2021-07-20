import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./createCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemoru: CategoriesRepositoryInMemory;

describe("Create category", () => {
    beforeEach(() => {
        categoriesRepositoryInMemoru = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(
            categoriesRepositoryInMemoru
        );
    });

    it("should be able to create new category", async () => {
        const category = {
            name: "Category Test",
            description: "Category Description Test",
        };

        await createCategoryUseCase.execute(category);

        const categoryCreated = await categoriesRepositoryInMemoru.findByName(
            category.name
        );

        expect(categoryCreated).toHaveProperty("id");
    });

    it("should not be able to create category with same name", async () => {
        const category = {
            name: "Category Test",
            description: "Category Description Test",
        };
        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });
        expect(async () => {
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });
        }).rejects.toEqual(new AppError("Category already exists"));
    });
});
