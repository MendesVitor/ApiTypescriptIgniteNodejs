import express from "express";
import SwaggerUi from "swagger-ui-express";

import "./database";
import { routes } from "./routes";
import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());

app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(swaggerFile));

app.use(routes);

app.listen(3333, () => {
    console.log("server is running!");
});
