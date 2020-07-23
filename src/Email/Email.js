const nodemailer = require('nodemailer');

class Email {
    constructor(oConfig) {
        this.createTransport = nodemailer.createTransport(oConfig);
    }
    enviarCorreo(oEmail) {
        try {
            this.createTransport.sendMail(oEmail, function (error, info) {
                if (error) {
                    console.log("Error al enviar correo"+ error) 
                } else {
                    console.log("Correo Enviado Correctamente");
                }
                // this.createTransport.close()
            })
        } catch (error) {
            console.log("Error Correo " + error);
        }
    }
}

module.exports= Email