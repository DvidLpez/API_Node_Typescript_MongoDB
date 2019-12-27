import { Document } from 'mongoose';

export interface IUsuario extends Document {
   nombre: string;
   email: string;
   password: string;
   avatar: string;
   compararPassword(password: string): boolean;
}
