
/**
 * 
 * @name            AUTH_TOKEN
 * @description     Comprueba si el token es válido o ha caducado
 *                  Si es así pasa la validación
 * 
 */

import { Response, NextFunction } from 'express';
import Token from '@src/providers/token';

export const AUTH_TOKEN = (req: any, res: Response, next: NextFunction) => {

   const userToken = req.get('x-token') || '';

   Token.comprobarToken(userToken)

      .then((decoded: any) => {
         console.log('Decode', decoded);
         req.usuario = decoded.usuario;
         next();
      })
      .catch(err => {
         res.status(401).json({
            status: false,
            mensaje: 'El token no es valido'
         })
      })
}