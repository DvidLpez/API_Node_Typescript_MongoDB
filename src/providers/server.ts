import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import { IRoutes } from '@src/interfaces/iRoutes';
import config from '@src/config/config';

export default class Server {

  public app:express.Application;
  public port: number;

  constructor(){
      this.app = express(); 
      this.port = config.node_port || 3000;
      this.app.use( fileUpload() ); 
  }

  public bodyParseApplication(extended: boolean) {
    this.app.use( bodyParser.urlencoded({ extended }));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.raw());
  }

  public corsApplication (origin:boolean, credentials:boolean) {
    this.app.use( cors({ origin, credentials }));
  }

  public addRoutes(routes:Array<IRoutes>) {
    routes.forEach( route => {
        this.app.use( route.url , route.module );
    });
  }

  public start(){
    this.app.listen( this.port );
    console.log(`Servidor escuchando en http://localhost:${this.port}`);
  }
}
