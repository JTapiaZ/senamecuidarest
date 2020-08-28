'use strict'
require('mongoose-type-email');
const {Schema, model} = require("mongoose");
require('mongoose-type-email');

const funcionarioSchema = new Schema(
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
        torre: {
            type: String,
            required: true,
            max: 30
        },
        piso: {
            type: String,
            required: true,
            max: 30
        },
        transporte: {
            type: String,
            required: true,
            max: 30
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
        }
    },
    {timestamps: true}
)

module.exports = model("Funcionario", funcionarioSchema);

