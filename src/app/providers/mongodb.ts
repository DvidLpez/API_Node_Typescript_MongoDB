import config from '../../config/config';
import mongoose from 'mongoose';

export default class MongoDB {
   
   private url:string;

   constructor(){
      const _ = config;
      this.url = `${_.database.protocol}${_.database.host}:${_.database.port}/${_.database.bbdd}`;
   }

   connect() {
      mongoose.connect( this.url, 
         { useNewUrlParser: true, useCreateIndex: true}, 
         ( err => {
            if(err) throw err;
            console.log(`Conexión establecida con ${this.url}`);
            }
         )
      );
   }
}
