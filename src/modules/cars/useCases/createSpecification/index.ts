import { SpecificationsRepository } from "../../repositories/implementations/specificationsRepository";
import { CreateCategoryController } from "../createCategory/createCategoryController";
import { CreateCategoryUseCase } from "../createCategory/createCategoryUseCase";

const specificationRepository = new SpecificationsRepository();

const createSpecificationUseCase = new CreateCategoryUseCase(
    specificationRepository
);
const createSpecificationController = new CreateCategoryController(
    createSpecificationUseCase
);

export { createSpecificationController };
