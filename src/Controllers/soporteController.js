const {emailSend} = require('./emailSoporteController');


exports.soporte_create = function (req, res) {

    const {body} = req

    console.log(body);

// ------------- save public in the database -----------
    emailSend(body)
    return res.send("Ok")
}
