/**
 * @name            usuarioSchema
 * @description     Modelo de datos para un objeto usuario
 */

import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUsuario } from '../../core/interfaces/iUsuario';

const usuarioSchema = new Schema({

   nombre: {
      type: String,
      required: [true, 'El nombre es necesario']
   },
   avatar: {
      type: String,
      default: 'av-1.png'
   },
   email: {
      type: String,
      unique: true,
      required: [true, 'El correo es necesario']
   },
   password: {
      type: String,
      unique: false,
      required: [true, 'La contraseña es necearia']
   }
});


usuarioSchema.method('compararPassword', function (password: string = ''): boolean {

   if (bcrypt.compareSync(password, this.password)) {
      return true;
   } else {
      return false;
   }
});

export const Usuario = model<IUsuario>('Usuario', usuarioSchema);




