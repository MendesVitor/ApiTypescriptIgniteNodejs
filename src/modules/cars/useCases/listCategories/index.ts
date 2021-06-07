import { CategoriesRepository } from "../../repositories/implementations/categoriesRepository";
import { ListCategoriesController } from "./listCategoriesController";
import { ListCategoriesUseCase } from "./listcategoriesUseCase";

const categoriesRepository = null;
const listcategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);
const listCategoriesController = new ListCategoriesController(
    listcategoriesUseCase
);

export { listCategoriesController };
