//////////////////////////////////////////////////////////////
// Dependencias
//////////////////////////////////////////////////////////////
const func = require("./aplanar.js");
const abrirArchivoXls = require("./abrirArchivoXls.js");

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const cp = require("cookie-parser");
const jwt = require("jsonwebtoken");
const credencialesAdministradores = require("./datosAdministradores.json");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
require("dotenv").config();
//////////////////////////////////////////////////////////////
// Midleware de express
//////////////////////////////////////////////////////////////

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(cp());

//////////////////////////////////////////////////////////////
// conexion con la base de datos
//////////////////////////////////////////////////////////////

const mongoUrl = process.env.MONGO_URL;

mongoose
    .connect(mongoUrl, {
        useNewUrlParser: true,
        dbName: process.env.MONGO_DB
    })
    .then(() => {
        console.log("Conectado al base de datos");
    })
    .catch((e) => console.log(e));

//////////////////////////////////////////////////////////////
// Modelos de la base de datos
//////////////////////////////////////////////////////////////

require("./RepuestoDetalles");
require("./MotoDetalles");
require("./UsuarioDetalles.js");

const Repuesto = mongoose.model("Repuestos");
const Moto = mongoose.model("Motos");
const Usuario = mongoose.model("Usuarios");

//////////////////////////////////////////////////////////////
// Verificar si el usuario inicio sesion
//////////////////////////////////////////////////////////////

const estaAutorizado = (req) => {
    if (!req.cookies.JWT) {
        return false;
    }

    try {
        const verificacionToken = jwt.verify(
            req.cookies.JWT,
            process.env.SECRET
        );
        if (!verificacionToken) {
            return false;
        }
    } catch (e) {
        console.log(e);
        return false;
    }

    req.payload = jwt.decode(req.cookies.JWT, process.env.SECRET);
    return true;
};

//////////////////////////////////////////////////////////////
// Rutas de autenticacion
//////////////////////////////////////////////////////////////

app.post("/iniciar-sesion", async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ Usuario: req.body.Usuario });
        if (!usuario) {
            res.status(400).json({ error: "El usuario no existe" }).send();
            return;
        }

        const comparacionContraseñas = await bcrypt.compare(
            atob(req.body.Contraseña),
            usuario.Contraseña
        );

        if (!comparacionContraseñas) {
            res.status(400)
                .json({ error: "La contraseña no es correcta" })
                .send();
            return;
        }

        const contenido = { Usuario: usuario.Usuario };
        const token = jwt.sign(contenido, process.env.SECRET);

        res.cookie("JWT", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        }).send();
    } catch {
        res.status(400).json({
            error: "ha ocurrido un error al procesar su solicitud",
        });
    }
    res.status(200).send();

});

app.get("/cerrar-sesion", (req, res) => {
    res.clearCookie("JWT");
    res.send();
});

app.get("/comprobar-sesion", async (req, res) => {
    if (estaAutorizado(req)) {
        res.status(200).send();
    } else {
        res.clearCookie("JWT").status(400).send();
    }
});

//////////////////////////////////////////////////////////////
// Ruta para crear los administradores.
// ELIMINAR, SOLO ESTA PARA PODER TESTEAR
//////////////////////////////////////////////////////////////
app.get("/crear-administradores", async (req, res) => {
    let sesion = await mongoose.startSession();
    sesion.startTransaction();
    try {
        await Usuario.insertMany(credencialesAdministradores, { sesion });

        await sesion.commitTransaction();
        res.status(200).json("Hecho").send();
    } catch (error) {
        await sesion.abortTransaction();
        if (error instanceof mongoose.Error.ValidationError) {
            // Error de existencia de campos invalidos o vacios
            res.status(400).json("Error de validacion").send();
        } else if (error.code == 11000) {
            // existe algun producto que se esta cargando con codigo igual a otro
            res.status(400).json("Ya existe al menos un administrador").send();
        } else {
            // otros errores
            res.status(400).send("No se pudieron crear los usuarios");
        }
    } finally {
        await sesion.endSession();
    }
});

//////////////////////////////////////////////////////////////
// Rutas para trabajar con los productos de la base de datos
//////////////////////////////////////////////////////////////

app.post("/agregar-producto", async (req, res) => {
    try {
        if (!estaAutorizado(req)) throw new Error("No estas autorizado.");

        if (req.body["tipo"] === "Repuestos") {
            await Repuesto.create(req.body["form"]["Información Basica"]);
        } else if (req.body["tipo"] === "Motos") {
            await Moto.create(func.aplanar(req.body["form"]));
        }

        res.status(200).json("producto agregado satisfactoriamente").send();
    } catch (error) {
        if (error.code == 11000) {
            // existe algun producto con codigo igual a otro
            res.status(400).json("Codigo duplicado").send();
        } else {
            res.status(400).send();
        }
    }
});

app.get("/obtener-productos", async (req, res) => {
    try {
        if (!estaAutorizado(req)) throw new Error("No estas autorizado.");

        let { tipo, pagina, tamahoPagina } = req.query;
        pagina++;
        let elementoProducto = [];
        if (tipo === "Repuestos") {
            elementoProducto = await Repuesto.find({})
                .limit(tamahoPagina * 1)
                .skip((pagina - 1) * tamahoPagina)
                .exec();
        } else if (tipo === "Motos") {
            elementoProducto = await Moto.find({})
                .limit(tamahoPagina * 1)
                .skip((pagina - 1) * tamahoPagina)
                .exec();
        } else {
            throw new Error("No existe este producto.");
        }
        res.status(200).json(elementoProducto);
    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
});

app.post("/eliminar-producto", async (req, res) => {
    try {
        if (!estaAutorizado(req)) throw new Error("No estas autorizado.");

        if (req.body["tipo"] === "Repuestos") {
            Repuesto.deleteOne(
                { "Código de parte": req.body["datos"]["Código de parte"] },
                function (err, res) {
                    if (err) {
                        res.status(400)
                            .json("Ocurrio un error al eliminar el producto")
                            .send();
                    }
                }
            );
        } else if (req.body["tipo"] === "Motos") {
            Moto.deleteOne(
                {
                    Nombre: req.body["datos"]["Nombre"],
                    Modelo: req.body["datos"]["Modelo"],
                },
                function (err, res) {
                    if (err) {
                        res.status(400)
                            .json("Ocurrio un error al eliminar el producto")
                            .send();
                    }
                }
            );
        }
        res.status(200).json("Eliminado").send();
    } catch (error) {
        res.status(400).send();
    }
});

app.post("/suspension-producto", async (req, res) => {
    try {
        if (!estaAutorizado(req)) throw new Error("No estas autorizado.");

        if (req.body["tipo"] === "Repuestos") {
            Repuesto.findOneAndUpdate(
                { "Código de parte": req.body["datos"]["Código de parte"] },
                {
                    Suspendido: !req.body["datos"]["Suspendido"],
                },
                function (err) {
                    if (err) {
                        res.status(400).json("Ocurrio un error").send();
                    }
                }
            );
        } else if (req.body["tipo"] === "Motos") {
            Moto.updateOne(
                {
                    Nombre: req.body["datos"]["Nombre"],
                    Modelo: req.body["datos"]["Modelo"],
                },
                {
                    Suspendido: !req.body["datos"]["Suspendido"],
                },
                function (err, res) {
                    if (err) {
                        res.status(400).json("Ocurrio un error").send();
                    }
                }
            );
        }
        res.status(200).json("Hecho").send();
    } catch (error) {
        res.status(400).send();
    }
});

app.post(
    "/agregacion-masiva-producto",
    upload.single("archivo"),
    async (req, res) => {
        let sesion = await mongoose.startSession();
        sesion.startTransaction();
        try {
            if (!estaAutorizado(req)) throw new Error("No estás autorizado.");

            const datos = abrirArchivoXls.abrirArchivoXls(req.file.path);
            //console.log(datos)
            if (req.body["tipo"] === "Repuestos") {
                await Repuesto.insertMany(datos, { sesion });
            } else if (req.body["tipo"] === "Motos") {
                await Moto.insertMany(datos, { sesion });
            }

            await sesion.commitTransaction();
            res.status(200).json("Hecho").send();
        } catch (error) {
            await sesion.abortTransaction();
            if (error instanceof mongoose.Error.ValidationError) {
                // Error de existencia de campos invalidos o vacios
                console.log(error);
                res.status(400).json("Error de validacion").send();
            } else if (error.code == 11000) {
                // existe algun producto que se esta cargando con codigo igual a otro
                res.status(400).json("Codigo duplicado").send();
            } else {
                // otros errores
                console.log(error);
                res.status(400).send("Otro error");
            }
        } finally {
            await sesion.endSession();
        }
    }
);

app.post("/editar-producto", async (req, res) => {
    try {
        if (!estaAutorizado(req)) throw new Error("No estas autorizado.");

        const nuevosDatos = func.aplanar(req.body["datos"]);
        if (req.body["tipo"] === "Repuestos") {
            Repuesto.findOneAndUpdate(
                { "Código de parte": nuevosDatos["Código de parte"] },
                nuevosDatos,
                function (err) {
                    if (err) {
                        res.status(400).json("Ocurrio un error").send();
                    }
                }
            );
        } else if (req.body["tipo"] === "Motos") {
            Moto.updateOne(
                {
                    Nombre: nuevosDatos["Nombre"],
                    Modelo: nuevosDatos["Modelo"],
                },
                nuevosDatos,
                function (err, res) {
                    if (err) {
                        res.status(400).json("Ocurrio un error").send();
                    }
                }
            );
        }
        res.status(200).json("Hecho").send();
    } catch (error) {
        res.status(400).send();
    }
});

//////////////////////////////////////////////////////////////
// Puerto del servidor
//////////////////////////////////////////////////////////////

app.listen(5000, () => {
    console.log("Servidor Iniciado");
});
