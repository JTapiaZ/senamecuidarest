const SaludController = {}
const Aprendiz = require('../Models/tbl_aprendiz')
const moment = require('moment-timezone');

SaludController.ActualizarEstado = async (req, res) => {

    const {body} = req
    let dato = new Date()
    let date_ob = moment.tz(dato, "America/Bogota").locale('es').format('MMMM Do YYYY, h:mm:ss a')
    console.log(date_ob)

    const Sintomas = {
        nombre: body.nombre,


        sintomas: {
            fiebre: body.fiebre,
            Tos: body.Tos,
            horaActualizacion:date_ob ,
            DolorTragar: body.DolorTragar,
            MalestarGeneral: body.MalestarGeneral,
            DificultadRespirar: body.DificultadRespirar,
            Gripa: body.Gripa,
            Diarrea: body.Diarrea,
            ContactoSospechoso: body.ContactoSospechoso,
            DolorArticular: body.DolorArticular
        }
    }

    try {
        const identificacionAprendiz = await Aprendiz.findOne({documentoIdentidad: body.documentoIdentidad})

        if (identificacionAprendiz) {
            const ApId = identificacionAprendiz._id
            const nuevoEstado = await Aprendiz.findByIdAndUpdate(ApId, {$set: Sintomas}, {new: true})


            const fecha = nuevoEstado.horaActualizacion


            res.json(nuevoEstado)
        } else {
            res.status(404).json({message: 'La identificación no esta registrada'})
        }

    } catch (e) {

        console.log(e)
    }


}

module.exports = SaludController
