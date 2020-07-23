'use strict'
require('mongoose-type-email');
const { Schema, model } = require("mongoose");
require('mongoose-type-email');

const funcionarioSchema  = new Schema(
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
    },
    { timestamps: true }
)

module.exports = model("Funcionario", funcionarioSchema);

