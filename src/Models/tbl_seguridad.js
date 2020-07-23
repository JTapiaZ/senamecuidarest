'use strict'

const { Schema, model } = require("mongoose");

const securitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      max: 100
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true

    },
    username: {
      type: String,
      required: true,
      unique: true,
      max: 50
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: "security",
      enum: ["security", "admin"]
    },

  },
);

module.exports = model("Seguridad", securitySchema);
