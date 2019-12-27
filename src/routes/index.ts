import { IRoutes } from '@src/interfaces/iRoutes';
import postRoutes from './post';
import userRoutes from './usuario';
import swaggerRoutes from './swagger';

let version = '/v1';

const Routes:Array<IRoutes> = 
[
   {  url: `${version}/swagger`, module: swaggerRoutes },
   {  url: `${version}/posts`, module: postRoutes },
   {  url: `${version}/user`, module: userRoutes }
];

export default Routes;

