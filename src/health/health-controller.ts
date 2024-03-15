import { Request, Response } from "express";
import { EmailOptions } from "../shared/interfaces";
import { Util } from "../shared/libs/util";

export class HealthController {

    constructor( private util: Util ){}

    public test     = (_req: Request, res: Response) => {
        res.status(200).send("It Works! en Docker");
    }

    public testmail = async (_req: Request, res: Response) => {

        const email : EmailOptions = {
            to      : "info@develap.com",
            subject : "Test NodeJS",
            text    : "Esto es una prueba de email desde nodejs",
        }

        const response = await this.util.sendEmail(email);

        if (response == true)
        
            return res.status(200).send("Email Enviado");

        return res.status(400).send("Error al enviar el email");
    }


}
