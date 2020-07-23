import React, { useContext } from "react";
import AuthContext from "../../context/autenticacion/authContext";

const Barra = () => {
  // extraer la informacion de autenticacion
  const authContext = useContext(AuthContext);
  const { usuario, cerrarSesion } = authContext;

  return (
    <header className="app-header">
      {usuario ? (
        <p className="nombre-usuario">
          Hola <span>{usuario.usuario.nombre}</span>
        </p>
      ) : null}
      <nav className="nav-principal">
        <button
          className="btn btn-blank btn-primario"
          onClick={() => cerrarSesion()}
        >
          Cerrar Sesion
        </button>
      </nav>
    </header>
  );
};

export default Barra;
