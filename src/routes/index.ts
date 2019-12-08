import { IRoutes } from '../core/interfaces/iRoutes';
import postRoutes from './post';
import userRoutes from './usuario';

const Routes:Array<IRoutes> = 
[
   { url: '/posts', module: postRoutes },
   { url: '/user', module: userRoutes }
];

export default Routes;

