import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const sendMail = async (userEmail: string, otp: string): Promise<SMTPTransport.SentMessageInfo> => {
    const transpoter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bynsocial5087@gmail.com',
            pass: 'vwezattbqpijtooa'
        }
    });

    const mailOptions = {
        from: 'bynsocial5087@gmail.com',
        to: userEmail,
        subject: 'Verify Your Email',
        html: `<p>Enter <b>${otp}</b> in the page to verify your email address.</p>
               <p>This code <b>expires in 10 minutes</b>.</p>`
    }

    return transpoter.sendMail(mailOptions);
}