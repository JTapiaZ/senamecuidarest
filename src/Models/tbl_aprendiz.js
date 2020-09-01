'use strict'

const {Schema, model} = require("mongoose");
require('mongoose-type-email');
const moment = require('moment-timezone')

const aprendizSchema = new Schema(
    {
        nombre: {
            type: String,
            required: true,
            max: 30
        },
        sexo: {
            type: String,
            required: true,
            max: 30
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true
        },
        documentoIdentidad: {
            type: String,
            required: true,
            max: 20,
            unique: true
        },
        celular: {
            type: String,
            required: true,
            max: 50
        },
        telefono: {
            type: String,
            required: true,
            max: 50
        },
        direccionResidencia: {
            type: String,
            required: true,
            max: 50
        },
        eps: {
            type: String,
            required: true,
            max: 30
        },
        ficha: {
            type: String,
            required: true,
            max: 20
        },
        programaDeFormacion: {
            type: String,
            required: true,
            max: 50
        },
        transporte: {
            type: String,
            required: true,
            max: 50
        },
        jornada: {
            type: String,
            required: true,
            max: 50
        },
        sintomas: {

            fiebre: {
                type: Boolean,
                required: true,
            },
            Tos: {
                type: Boolean,
                required: true,
            },
            DolorTragar: {
                type: Boolean,
                required: true,
            },
            MalestarGeneral: {
                type: Boolean,
                required: true,
            },
            DificultadRespirar: {
                type: Boolean,
                required: true,
            },
            Gripa: {
                type: Boolean,
                required: true,
            },
            Diarrea: {
                type: Boolean,
                required: true,
            },
            ContactoSospechoso: {
                type: Boolean,
                required: true,
            },
            DolorArticular: {
                type: Boolean,
                required: true,
            },
        },

        horaActualizacion: {
            type: String,
            default: Date,

        },
    },
    {timestamps: true}
)

module.exports = model("Aprendiz", aprendizSchema);

