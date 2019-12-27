/**
 * 
 * @Name             PostController
 * @Description      Lógica para el manejo de rutas de posts
 * 
 */
import { Response } from "express";
import { Post } from "@src/models/post";
import FileSystem from "@src/providers/file-system";
import { FileUpload } from "@src/interfaces/file-upload";

const fileSystem = new FileSystem();
 

export default class PostController {

    constructor() { }
   /**
    * @name getPostPaginate
    * 
    * @param Object req 
    * @param Object res
    * 
    * @return Post paginados
    * 
    */ 
   getPostPaginate = async (req: any, res: Response) => {
    
      let pag = Number(req.query.pag) || 1;
      let skip = pag - 1;
      skip = skip * 5;
      const posts = await Post.find()
                              .sort({_id: -1}) // descendente
                              .limit(5)
                              .populate('usuario', '-password')
                              .skip( skip )
                              .exec();
   
      res.json({
         ok: true,
         pagina: pag,
         posts
      }) 
   }
   /**
    * @name createPost
    * 
    * @param Object req
    * @param Object res
    * 
    * @return Nuevo post
    * 
    */
   createPost = (req: any, res: Response) => {
    
      const body = req.body;
      body.usuario = req.usuario._id;
   
      const imagenes = fileSystem.imagTempoAPost( req.usuario._id );
      
      body.imgs = imagenes;
   
      Post.create( body ).then( async postDB => {
   
         await postDB.populate('usuario', '-password').execPopulate();
         
         res.json({
               ok: true,
               post: postDB 
         });

      }).catch( err => {
         res.json(err)
      });
   }
   /**
    * @name uploadFile
    * 
    * @param Object req
    * @param Object res
    * 
    * @return Imagen subida y usuario que ha subido la imagen
    * 
    */
   uploadFile = async (req: any, res: Response) => {

      if(!req.files ) {
         return res.status(400).json({
               ok: false,
               mensaje: 'No se subio ningún fichero'
         });
      }
   
      const file: FileUpload = req.files.image;
   
      if(!file){
         return res.status(400).json({
               ok: false,
               mensaje: 'No se subio ningún fichero - image'
         })
      }
   
      if( !file.mimetype.includes('image') ) {
   
         return res.status(400).json({
               ok: false,
               mensaje: 'Lo que subio no es una imagen'
         });
      }
   
      await fileSystem.guardarImagenTemporal( file, req.usuario._id);
   
      res.json({
         ok: true,
         user: req.usuario._id,
         file
      });
   }
   /**
    * @name getUrlImage
    * 
    * @param Object req
    * @param Object res
    * 
    * @return Imagen pasada por url
    */
   getUrlImage = (req: any, res: Response) => {
      const userid = req.params.userid;
      const img = req.params.img;
   
      const pathFoto = fileSystem.getFotoUrl( userid, img );
   
      res.sendFile( pathFoto);
   } 
}
