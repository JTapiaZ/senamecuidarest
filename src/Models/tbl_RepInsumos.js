'use strict'
require('mongoose-type-email');
const { Schema, model } = require("mongoose");
require('mongoose-type-email');

const repInsumoSchema  = new Schema(
    {
        tapabocas: {
            type: String,
            required:true,
            max: 20,
        },
        amonioCuaternario: {
            type: String,
            required: true,
            max: 30
        },
        antibacterial: {
            type: String,
            required: true,
            max: 50
        },
        alcohol: {
            type: String,
            required: true,
            max: 50
        },
        recorridosCampo: {
            type: String,
            required: true,
            max: 50,
        },
    },
    {timestamps: true}
)

module.exports = model("Reporte Insumos", repInsumoSchema);

