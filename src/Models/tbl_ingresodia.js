'use strict'
require('mongoose-type-email');
const { Schema, model } = require("mongoose");
require('mongoose-type-email');


const ingresoDiaSchema  = new Schema(
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
        cargo: {
            type: String,
            required: false,
            max: 30
        },
        email: {
            type: String,
            required: true,
            max: 50
        },
        documentoIdentidad: {
            type: String,
            required:true,
            max: 20,
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
        temperatura: {
            type: Number,
            max: 50
        },
        horaEntrada: {
            type: Date,
            default: Date.now
        },
    },
)

module.exports = model("IngresoDia", ingresoDiaSchema);

