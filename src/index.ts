import 'module-alias/register';

import MongoDB from '@src/providers/mongodb';
import Server from '@src/providers/server';
import Routes from '@src/routes/index';

const mongodb = new MongoDB;
const express = new Server; 

mongodb.connect();
express.bodyParseApplication(true);
express.corsApplication(true, true);
express.addRoutes(Routes);
express.start();
