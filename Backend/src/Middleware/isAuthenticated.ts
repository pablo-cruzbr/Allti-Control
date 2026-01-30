import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
    sub: string
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
){
    //Recebe o Token
    const authToken = req.headers.authorization

    if(!authToken){
        console.log("Token não enviado")
        return res.status(401).end();
    }

    const [, token] = authToken.split(" ")
    //console.log("PEGAMOS O TOKEN",token);
    //Validar o Token

   try{
    const {sub} = verify(
        token,
        process.env.JWT_SECREATE
    ) as Payload;

    req.user_id = sub;
    return next();
    //console.log("VALIDAMOS O TOKEN", sub)
   }catch(err){ 
    res.status(401).end();
   }
}