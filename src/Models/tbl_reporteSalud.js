'use strict'
require('mongoose-type-email');
const {Schema, model} = require("mongoose");
require('mongoose-type-email');

const reporteSaludSchema = new Schema(
    {
        nombre: {
            type: String,
            required: true,
            max: 30,
            
        },
        sexo: {
            type: String,
            required: true,
            max: 30
        },
        cargo: {
            type: String,
            required: false,
            max: 30
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: false
        },
        documentoIdentidad: {
            type: String,
            required: true,
            max: 20,
            unique: false
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
        transporte: {
            type: String,
            required: true,
            max: 50
        },
        jornada: {
            type: String,
            required: false,
            max: 50
        },
        sintomas: {

            fiebre: {
                type: Boolean,
                required: true,
            },
            tos: {
                type: Boolean,
                required: true,
            },
            dolorTragar: {
                type: Boolean,
                required: true,
            },
            malestarGeneral: {
                type: Boolean,
                required: true,
            },
            dificultadRespirar: {
                type: Boolean,
                required: true,
            },
            gripa: {
                type: Boolean,
                required: true,
            },
            diarrea: {
                type: Boolean,
                required: true,
            },
            contactoSospechoso: {
                type: Boolean,
                required: true,
            },
            dolorArticular: {
                type: Boolean,
                required: true,
            },
        }
    },
    {timestamps: true}
)

module.exports = model("ReporteSalud", reporteSaludSchema);

