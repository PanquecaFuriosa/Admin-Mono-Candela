const mongoose = require("mongoose");

// Definición del esquema para el modelo de datos del usuario
const esquema = {
    Usuario: {type: String, required: true, unique: true},
    Contraseña: {type: String, required: true},
};

// Definición del modelo de datos del usuario
const UsuarioDetalles = new mongoose.Schema(esquema, {
    collection: "Usuarios",
});

// Asociar el modelo de datos del usuario con la colección "Usuarios" en la base de datos
mongoose.model("Usuarios", UsuarioDetalles);
