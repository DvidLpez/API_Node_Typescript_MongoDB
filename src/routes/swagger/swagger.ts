import { Router } from "express";
import swaggerDocument from './swagger.json';
import swaggerUi from "swagger-ui-express";

const options = {
   swaggerOptions: {
     authAction :{ JWT: {name: "JWT", schema: {type: "apiKey", in: "header", name: "Authorization", description: ""}, value: "Bearer <JWT>"} }
   }
 };

let swaggerRoutes = Router();
swaggerRoutes.use("/docs", swaggerUi.serve);
swaggerRoutes.get("/docs", swaggerUi.setup(swaggerDocument));

export default swaggerRoutes;