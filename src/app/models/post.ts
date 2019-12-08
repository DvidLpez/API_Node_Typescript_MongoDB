/**
 * @name            postSchema
 * @description     Modelo de datos para un objeto post
 */

import { Schema, model } from "mongoose";
import { IPost } from '../../core/interfaces/iPost';

const postSchema = new Schema({
   created: {
      type: Date
   },
   mensaje: {
      type: String
   },
   imgs: [{
      type: String
   }],
   coords: {
      type: String
   },
   usuario: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: [true, 'Debe existir una referencia al usuario']
   }
});

postSchema.pre<IPost>('save', function (next) {
   this.created = new Date();
   next();
})

export const Post = model<IPost>('Post', postSchema);
