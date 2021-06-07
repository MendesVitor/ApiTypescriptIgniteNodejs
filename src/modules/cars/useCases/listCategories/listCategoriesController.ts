import { Request, Response } from "express";

import { ListCategoriesUseCase } from "./listcategoriesUseCase";

class ListCategoriesController {
    constructor(private ListCategotiesUseCase: ListCategoriesUseCase) { }

    handle(request: Request, response: Response): Response {
        const all = this.ListCategotiesUseCase.execute();

        return response.json(all);
    }
}

export { ListCategoriesController };
