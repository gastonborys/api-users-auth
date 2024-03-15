import nodemailer from "nodemailer";
import { config } from "../../config";
import { EmailOptions } from "../../shared/interfaces";

export class Util {

    constructor(){}

    public async sendEmail(options: EmailOptions): Promise<boolean> {

        try {
            const transporter = nodemailer.createTransport({
                host: config.email.smtp_host,
                port: config.email.smtp_port ?? 587,
                secure: false, 
                auth: {
                    user: config.email.smtp_user,
                    pass: config.email.smtp_pass,
                },
            } as nodemailer.TransportOptions);

            const mailOptions = {                
                from: `${ config.email.smtp_from_n } <${ config.email.smtp_from_a }>`,
                to: options.to,
                subject: options.subject,
                text: options.text,
            };

            await transporter.sendMail(mailOptions);

            return true;

        } 
        catch (error) 
        {
            console.log(error);
            return false;
        }

    } 
}
