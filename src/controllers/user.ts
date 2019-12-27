/**
 * @Name            UserController
 * @Description     Lógica para el manejo de rutas de usuarios
 */
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { Usuario } from "@src/models/usuario";
import Token from "@src/providers/token";

export default class UserController {

   constructor() {}
   /**
    * @name Login
    * @param Object req
    * @param Object res
    * @return Token user 
    */
   login = ( req: Request, res: Response) => {

      const body = req.body;
      Usuario.findOne( { email: body.email }, ( err, userDB ) => {
         if( err ) throw err;
         if(!userDB) {
            return res.json({
               ok: false,
               mensaje: 'Usuario/Contraseña no son correctos'
            });
         }
         if(userDB.compararPassword( body.password )){
            const tokenUser = Token.getJwtToken({
               _id: userDB._id,
               nombre: userDB.nombre,
               email: userDB.email,
               avatar: userDB.avatar
            });

            res.json({
               status: true,
               mensaje: "Usuario logado correctamente",
               token: tokenUser
            });
   
         }else{
            return res.json({
               status: false,
               mensaje: 'Usuario/Contraseña no son correctos ***'
            });
         }  
      });
   }
   /**
    * @name newUser
    * @param Object req
    * @param Object res
    * @return Token user
    */
   public newUser = ( req: any, res: Response ) => {

      const user = { 
         nombre: req.body.nombre,
         email: req.body.email,
         password: bcrypt.hashSync( req.body.password, 10 ),  
         avatar: req.body.avatar
      }
   
      Usuario.create( user).then( userDB => {
   
         const tokenUser = Token.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
         });
   
         res.status(201).json({
            status: true,
            mensaje: 'Usuario creado correctamente',
            token: tokenUser
         });
         
      }).catch( err => {
         res.status(400).json({
            status: false,
            err
         })
      });
   }
   /**
    * @name updateToken
    * 
    * @param Object req
    * @param Object res
    * 
    * @return Token update when change user data
    * 
    */
   updateToken = (req: any, res: Response) => {

      const user = {
         nombre: req.body.nombre || req.usuario.nombre,
         email: req.body.email || req.usuario.email,
         avatar: req.body.avatar || req.usuario.avatar
      }
   
      Usuario.findByIdAndUpdate( req.usuario._id, user, { new: true }, (err, userDB: any) => {
   
         if(err) throw err;
   
         if( !userDB){
            res.status(204).json({
               status: false,
               mensaje: 'No existe un usuario con ese ID'
            });
         }
   
         const tokenUser = Token.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
         });
   
         res.status(200).json({
            status: true,
            mensaje: 'Usuario actualizado',
            token: tokenUser
         }); 
      });
   }
   /**
    * @name getUserToken
    * 
    * @param Object req
    * @param Object res
    * 
    * @return Decrypt token and return user
    */
   getUserToken = (req: any, res: Response ) =>{

      const usuario  = req.usuario;
   
      res.status(200).json({
         status: true,
         usuario
      });
   }
}