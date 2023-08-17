import nodemailer from "nodemailer";

export default async function contact(req, res) {
    // check if a corrrect method
    if (req.method !== 'POST') {
        return res.status(405).json({
            message: 'Method not allowed'
        });
    }

    const { name, email, phone, message } = req.body;
    
    try {

        //Send e-mail to administrators

        // let mailTransporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: 'xyz@gmail.com',
        //         pass: '*************'
        //     }
        // });

        const mailTransporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMPT_SECURE,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            }
        });
         
        let mailDetails = {
            from: 'karimkompissi@gmail.com',
            to: ' danielseverin86@gmail.com',
            subject: 'Message reçu à partir du formulaire de contact',
            html: `Vous avez reçu un message de:
            Email : ${email}
            Nom: ${name}
            Téléphone: ${phone}
            Message: ${message}`,
        };
                 
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                console.log('Error Occurs', err);
                return res.status(409).json({
                    message: 'Oops nous rencontrons des difficultés à envoyer votre message. Veuillez ressayer s\'il vous plait ',
                });
            } else {
                console.log('Email sent successfully', data);
                return res.status(201).json({
                    message: 'Votre message a bien été envoyé. Vous aurez probablement un retour de notre part très bientôt',
                });
            }
        });  

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}