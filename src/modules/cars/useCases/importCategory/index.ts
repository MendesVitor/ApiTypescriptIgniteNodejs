import { CategoriesRepository } from "../../repositories/implementations/categoriesRepository";
import { ImportCategoryUseCase } from "./importCateforyUseCase";
import { ImportCategoryController } from "./importCategoryController";

const categoriesRepository = CategoriesRepository.getInstance();
const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);
const impoprtCategoryController = new ImportCategoryController(
    importCategoryUseCase
);

export { impoprtCategoryController };
