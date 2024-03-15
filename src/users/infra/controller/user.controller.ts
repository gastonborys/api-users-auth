import { Request, Response } from "express";
import { Jwt } from "../libs/jwt";
import { Credentials } from "../../domain/user.models";
import IUserService from "../../domain/user.service.interface";

export class UserController{

    private jwt: Jwt;

    constructor( private userService: IUserService)
    {
        this.jwt    = new Jwt();
    }

    public create   = async (_req: Request, res: Response) =>
    {
        try{
            const newUser   = _req.body;
            const token     = String(_req.headers.authorization);
            const identity  = this.jwt.getIdentity(token);

            const response  = await this.userService.create(newUser, identity);
                
            return res.status(200).json({
                "request"   : "Users::create()",
                "response"  : "OK",
                "user"      : response,
            });
        }
        catch(error)
        {
           return res.status(400).json({
                "request"   : "Users:create()",
                "response"  : "KO",
                "message"   : String(error).replace("Error: ", ""),
            });
        }
    };

    public update   = async (req: Request, res: Response) =>
    {
        try {
            const token         = String(req.headers.authorization);
            const identity      = this.jwt.getIdentity(token);

            const id:string     = req.params.id;

            const userData      = req.body;

            const response      = await this.userService.update(id, userData, identity);

            return res.status(200).json({
                "request"   : "Users::update()",
                "response"  : "OK",
                "user"      : response,
            });
        }
        catch (error)
        {
            return res.status(400).json({
                "request"   : "Users:update()",
                "response"  : "KO",
                "message"   : String(error).replace("Error: ", ""),
            });
        }
    };

    public changePassword   = async (req: Request, res: Response) =>
    {
        try {
            const token             = String(req.headers.authorization);
            const identity          = this.jwt.getIdentity(token);

            const userData          = req.body;

            const email:string      = userData.email;

            const password:string   = userData.password;

            await this.userService.updatePassword(email, password, identity);

            return res.status(200).json({
                "request"   : "Users::changePassword()",
                "response"  : "OK",
                "user"      : "Password changed",
            });
        }
        catch (error)
        {
            return res.status(400).json({
                "request"   : "Users:changePassword()",
                "response"  : "KO",
                "message"   : String(error).replace("Error: ", ""),
            });
        }
    };

    public remove   =  async (req: Request, res: Response) =>
    {
        try{
            const id     = req.params.id;

            await this.userService.delete(id);

            return res.status(200).json({
                "request"   : "Users::remove()",
                "response"  : "OK",
                "message"   : `User ${id} deleted succesfully`,
            });

        }
        catch(error)
        {
            return res.status(400).json({
                "request"   : "Users:remove()",
                "response"  : "KO",
                "message"   : error
            });
        }
    };

    public show     = async (req: Request, res: Response) =>
    {
        try{

            const id        = req.params.id;

            const userData  = await this.userService.get(id);

            return res.status(200).json({
                "request"   : "Users::show()",
                "response"  : "OK",
                "user"      : userData ?? `User "${id}" not found`,
            });

        }
        catch(error)
        {
            return res.status(400).json({
                "request"   : "Users:show()",
                "response"  : "KO",
                "message"   : error,
            });
        }
    };

    public list     = async (_req: Request, res: Response) => {

        return res.status(200).json({
            "request"   : "Users::list()",
            "response"  : "OK",
            "users"     : await this.userService.list(),
        });
    };

    public login   = async (req: Request, res: Response) =>
    {
        try{

            const credentials : Credentials	= req.body;

            const response	= await this.userService.login(credentials);

            if (typeof(response) == "string")
                throw new Error(response);
                
            return res.status(200).json({
                "request"   : "Users::login()",
                "response"  : "OK",
                "user"      : response,
            });
        }
        catch(error)
        {
           return res.status(400).json({
                "request"   : "Users:login()",
                "response"  : "KO",
                "message"   : String(error).replace("Error: ", ""),
            });
        }
    };
}
