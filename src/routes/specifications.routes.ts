import { Router } from "express";

import { SpecificationsRepository } from "../modules/cars/repositories/implementations/specificationsRepository";
import { CreateSpecificationService } from "../modules/cars/services/createSpecificationService";

const specificationsRoutes = Router();

const specificationRepository = new SpecificationsRepository();

specificationsRoutes.post("/", (request, response) => {
    const { name, description } = request.body;

    const createSpecificationService = new CreateSpecificationService(
        specificationRepository
    );

    createSpecificationService.execute({ name, description });

    response.status(201).send();
});

export { specificationsRoutes };
