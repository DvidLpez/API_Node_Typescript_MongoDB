import { IRoutes } from '../core/interfaces/iRoutes';
import postRoutes from './post';
import userRoutes from './usuario';
import swaggerRoutes from './swagger';

const Routes:Array<IRoutes> = 
[
   { 
      url: '/swagger', 
      module: swaggerRoutes 
   },
   { url: '/posts', module: postRoutes },
   { url: '/user', module: userRoutes }
];

export default Routes;

