import { Request, Response } from "express";

import { CreateCategoryUseCase } from "../createCategory/createCategoryUseCase";

class CreateSpecificationController {
    constructor(private createSpecificationUseCase: CreateCategoryUseCase) {}

    handle(request: Request, response: Response) {
        const { name, description } = request.body;

        this.createSpecificationUseCase.execute({ name, description });

        response.status(201).send();
    }
}

export { CreateSpecificationController };
