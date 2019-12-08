import MongoDB from './app/providers/mongodb';
import Server from "./app/providers/server";
import Routes from './routes/index';

const mongodb = new MongoDB;
const express = new Server; 

mongodb.connect();
express.bodyParseApplication(true);
express.corsApplication(true, true);
express.addRoutes(Routes);
express.start();
