import { CategoriesRepository } from "../../repositories/implementations/categoriesRepository";
import { CreateCategoryController } from "./createCategoryController";
import { CreateCategoryUseCase } from "./createCategoryUseCase";

export default (): CreateCategoryController => {
    const categoriesRepository = new CategoriesRepository();

    const createCategoryUseCase = new CreateCategoryUseCase(
        categoriesRepository
    );

    const createCategoryController = new CreateCategoryController(
        createCategoryUseCase
    );

    return createCategoryController;
};
