import React from "react";
import logo from "./imagenes/logo.svg";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import {
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
} from "@mui/material";

import { BiLogOut } from "react-icons/bi";

import { FaMotorcycle } from "react-icons/fa";
import { SiCoronaengine } from "react-icons/si";

import "./estilosBarraLateral.css";
import { cerrarSesion } from "../../Utilidades/FetchApis/PeticionesBD";
import { useGlobalAlert } from "../../hooks/useGlobalAlert";

/**
 * Componente de la barra lateral de navegación.
 *
 * @param {React.ReactNode} children - Los elementos hijos que se mostrarán en el componente.
 * @returns {React.ReactNode} El componente de la barra lateral.
 */
const BarraLateral = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { popAlert } = useGlobalAlert();

    const menuItems = [
        {
            direccion: "/motos",
            nombre: "Motos",
            icono: <FaMotorcycle className="icono" />,
        },
        {
            direccion: "/repuestos",
            nombre: "Repuestos",
            icono: <SiCoronaengine className="icono" />,
        },
    ];

    /**
     * Maneja el evento de cierre de sesión.
     * @returns {Promise<void>} Una promesa que resuelve cuando se cierra la sesión.
     */
    const manejarCierreSesion = async () => {
        try {
            const respuesta = await cerrarSesion();
            if (!respuesta.ok) {
                popAlert("No se pudo cerrar la session", "error");
                console.log(respuesta);
                return;
            }

            popAlert("Se ha cerrado la sesion", "success");
            navigate("/", {
                state: { from: location },
                replace: true,
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <Box className="container" component="div">
                <Box className="barraLateral" component="div">
                    <Box className="contenedorLogo" component="div">
                        <Link to="/motos">
                            <img
                                src={logo}
                                className="logo"
                                alt="Logo de Keeway"
                            />
                        </Link>
                    </Box>
                    <List>
                        {menuItems.map((item, index) => (
                            <NavLink
                                to={item.direccion}
                                key={item.nombre}
                                className="enlace"
                            >
                                <ListItem>
                                    <ListItemText
                                        className="textoEnlace"
                                        primary={item.nombre}
                                    />
                                    <ListItemIcon>{item.icono}</ListItemIcon>
                                </ListItem>
                            </NavLink>
                        ))}
                    </List>
                    <Button
                        sx={{ position: "absolute", bottom: 5, left: 5 }}
                        variant="contained"
                        color="primary"
                        onClick={manejarCierreSesion}
                        startIcon={<BiLogOut />}
                    >
                        Cerrar Sesión
                    </Button>
                </Box>
                <Box className="contenido">{children}</Box>
            </Box>
        </>
    );
};

export default BarraLateral;
