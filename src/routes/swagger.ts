import { Router } from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger.json';
 
let swaggerRoutes = Router();

// Sandbox API
swaggerRoutes.get('/', swaggerUi.setup(swaggerDocument) );

export default swaggerRoutes;