# NODE - TYPESCRIPT - GRAPHQL

API project with express and endpoint graphql, coding with typescript

## Configuration

Create project
```
npm init                                           -> Package.json is created with this command
tsc --init                                         -> Genera el archivo de configuración de ts

```

Node package modules
```
npm install -g nodemon                             -> Visulalizamos en terminal los console log
npm install express                                -> Crea un server web res       
npm install body-parser                            -> Recibe la info de post transforma en js
npm install cors                                   -> Peticiones cors
npm install mongoose                               -> Interaciones con bbdd
npm install express-fileupload                     -> Poder subir imagenes
npm install jsonwebtoken                           -> JWT token
npm install bcrypt                                 -> Encryptar contraseñas
npm install uniqid                                 -> Create unique ID
```

Types - help typescript
```
npm install @types/express --save-dev  
npm install @types/mongoose --save-dev 
npm install @types/bcrypt --save-dev
npm install @types/jsonwebtoken --save-dev
npm install @types/express-fileupload --save-dev
npm install @types/uniqid --save-dev
npm install @types/cors --save-dev
```

## Usage

```
tsc -w            -> Entra en modo observador
nodemon dist      -> Start server

```

## Author
David López
