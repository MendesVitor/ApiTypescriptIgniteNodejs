import { CategoriesRepository } from "../../repositories/implementations/categoriesRepository";
import { ImportCategoryUseCase } from "./importCateforyUseCase";
import { ImportCategoryController } from "./importCategoryController";

const categoriesRepository = null;
const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);
const impoprtCategoryController = new ImportCategoryController(
    importCategoryUseCase
);

export { impoprtCategoryController };
