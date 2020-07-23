'use strict'

const { Schema, model } = require("mongoose");
require('mongoose-type-email');

const aprendizSchema  = new Schema(
    {
        nombre: {
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
            required:true,
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
    },
    { timestamps: true }
)

module.exports = model("Aprendiz", aprendizSchema);

