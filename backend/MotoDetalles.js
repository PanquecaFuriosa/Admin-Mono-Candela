const mongoose = require("mongoose");

const esNumero = (valor) => {
    return /^[0-9]*$/.test(valor);
};

// Definición del esquema para el modelo de datos de la moto
let esquema = {
    Nombre: { type: String, required: true },
    Modelo: { type: String, required: true },
    Categoría: { type: String, required: true },
    Arranque: { type: String, required: true },
    Embrague: { type: String, required: true },
    Chasis: { type: String, required: true },
    Distribución: { type: String, required: true },
    Refigeración: { type: String, required: true },
    Alimentación: { type: String, required: true },
    Suspendido: { type: Boolean, required: true },
    Cantidad: {
        type: String,
        required: true,
        validate: [esNumero, "Este campo debe contener solo numeros"],
    },
    Precio: {
        type: String,
        required: true,
        validate: [esNumero, "Este campo debe contener solo numeros"],
    },
    "Suspensión Delantera": { type: String, required: true },
    "Recorrido suspensión delantera": { type: String, required: true },
    "Freno Delantero": { type: String, required: true },
    "Diámetro freno delantero": { type: String, required: true },
    "Neumático delantero": { type: String, required: true },
    "Llanta Delantera": { type: String, required: true },
    "Suspensión trasera": { type: String, required: true },
    "Recorrido suspesión trasera": { type: String, required: true },
    "Freno trasero": { type: String, required: true },
    "Diámetro freno trasero": { type: String, required: true },
    "Neumático Trasero": { type: String, required: true },
    "Llanta trasera": { type: String, required: true },
    "Configuración del motor": { type: String, required: true },
    "Ciclo de moto": { type: String, required: true },
    "Potencia máxima": { type: String, required: true },
    "Regimen de giro del motro para potencia maxima (rpm)": {
        type: String,
        required: true,
    },
    "Par motor maximo (Nm)": { type: String, required: true },
    "Regimen de giro del motor para el par maximo (rpm)": {
        type: String,
        required: true,
    },
    Cilindrada: { type: String, required: true },
    "Diámetro de cilindros (mm)": { type: String, required: true },
    "Carrera de cilindros (mm)": { type: String, required: true },
    "Relación de compresión": { type: String, required: true },
};

// Definición del modelo de datos de la moto
const MotoDetalles = new mongoose.Schema(esquema, {
    collection: "Motos",
}).index({ Nombre: 1, Modelo: 1 }, { unique: true });

// Asociar el modelo de datos de la moto con la colección "Motos" en la base de datos
mongoose.model("Motos", MotoDetalles);
