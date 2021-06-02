import { Request, Response } from "express";

import { CategoriesRepository } from "../../repositories/implementations/categoriesRepository";
import { CreateCategoryUseCase } from "./createCategoryUseCase";

class CreateCategoryController {
    constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

    handle(request: Request, response: Response): Response {
        const { name, description } = request.body;
        const categoriesRepository = CategoriesRepository.getInstance();
        this.createCategoryUseCase = new CreateCategoryUseCase(
            categoriesRepository
        );

        this.createCategoryUseCase.execute({ name, description });

        return response.status(201).send();
    }
}

export { CreateCategoryController };
