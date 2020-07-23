import React, { useContext, useEffect } from "react";
import Proyecto from "./Proyecto";
import ProyectosContext from "../../context/proyectoContext";
import AlertaContext from "../../context/alertas/alertaContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ListadoProyectos = () => {
  //extrar proyectos  de state inicial
  const proyectosContext = useContext(ProyectosContext);
  const { mensaje, proyectos, ObtenerProyectos } = proyectosContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;
  //obtener proyectos cuandi carga
  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    ObtenerProyectos();
    // eslint-disable-next-line
  }, [mensaje]);
  // revisar tiene contenido
  if (proyectos.length === 0) return <p>No hay proyectos disponibles</p>;

  return (
    <ul className="listado-proyectos">
      {alerta ? (
        <div className={`${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <TransitionGroup>
        {proyectos.map((proyecto) => (
          <CSSTransition key={proyecto._id} timeout={200} classNames="proyecto">
            <Proyecto proyecto={proyecto} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListadoProyectos;
