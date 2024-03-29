import { Request, Response, NextFunction }  from "express";
import jwt from "jwt-simple";
import {config} from "../../../config";

const listMiddleware = (req: Request, res: Response, next: NextFunction) => {

    if (!req.headers.authorization)
    {
        return res.status(401).json({
            "response"      : "KO",
            "msg"           : "Can't find Authorization header"
        });
    }

    let token: string       = req.headers.authorization.replace(/['"]+/g,'');

    try {
        let key     = config.jwt.key ?? "here_be_the_key";
        let payload = jwt.decode(token, key);
        
        if (!payload.isadmin)
            return res.status(401).json({
                "response"      : "KO",
                "message"       : "You don't have rights to make this request"
            });

    }
    catch( error )
    {
        return res.status(401).json({
            "response"      : "KO",
            "message"       : String(error),
        });
    }

    return next();
}

export default listMiddleware;
