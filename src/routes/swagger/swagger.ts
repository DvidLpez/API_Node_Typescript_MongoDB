import { Router } from "express";
import swaggerDocument from './swagger.json';
import swaggerUi from "swagger-ui-express";

let swaggerRoutes = Router();
swaggerRoutes.use("/docs", swaggerUi.serve);
swaggerRoutes.get("/docs", swaggerUi.setup(swaggerDocument));

export default swaggerRoutes;