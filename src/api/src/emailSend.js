const nodemailer = require("nodemailer");
require('dotenv').config({  
    path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
  })

function sendEmail(data){
    console.log(data)
    let transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: `${process.env.EMAIL_NODEMAILER}`,
            pass: `${process.env.SENHA_NODEMAILER}`
        }
    });

    const mailOptions = {
        from: 'mateusvitorino@hotmail.com', // sender address
        to: `${data[1]}`, // receiver (use array of string for a list)
        subject: 'Recuperação de senha Gestão Inteligente', // Subject line
        html: `Sua senha cadastrada é: <br> <p>${data[0]}</p>`// plain text body
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
}

module.exports = { sendEmail }

