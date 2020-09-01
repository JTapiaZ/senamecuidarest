'use strict'
require('mongoose-type-email');
const { Schema, model } = require("mongoose");
require('mongoose-type-email');

const repLimpiezaSchema  = new Schema(
    {
        encargado: {
            type: String,
            required:true,
            max: 150
        },
        torre: {
            type: String,
            required: true,
            max: 30
        },
        piso: {
            type: String,
            required: true,
            max: 50
        },
        ambiente: {
            type: String,
            required: true,
            max: 50
        },
        personasEncargadas: {
            type: String,
            required: true,
            max: 50,
        },
        preguntas: {
            aantes: {
                type: Boolean,
                required: true,
            },
            adespues: {
                type: Boolean,
                required: true,
            },
            mantes: {
                type: Boolean,
                required: true,
            },
            mdespues: {
                type: Boolean,
                required: true,
            },
        },
    },
    {timestamps: true}
)

module.exports = model("Reporte Limpieza", repLimpiezaSchema);

