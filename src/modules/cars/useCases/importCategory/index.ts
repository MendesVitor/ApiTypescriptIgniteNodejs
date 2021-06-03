import { ImportCategoryUseCase } from "./importCateforyUseCase";
import { ImportCategoryController } from "./importCategoryController";

const importCategoryUseCase = new ImportCategoryUseCase();
const impoprtCategoryController = new ImportCategoryController(
    importCategoryUseCase
);

export { impoprtCategoryController };
