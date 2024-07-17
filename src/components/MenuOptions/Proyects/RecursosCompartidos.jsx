import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/loading";
import {
  Card,
  CardHeader,
  Typography,
  Chip,
  Avatar,
  CardBody,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/solid";

import { AiFillPlusCircle } from "react-icons/ai";
import CrearRecursoCompartido from "./CrearRecursoCompartido";

export default function RecursosCompartidos({ ProyectoID, permite_agregar }) {
  const [loading, setLoading] = useState(false);
  const [ListaRecursos, SetListaRecursos] = useState([]);
  const [openAgregarRecurso, setAgregarRecurso] = useState(false);

  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    //Cargar la lista de las areas
    //aqui tengo que enviar un parametro que indique que el usuario que solicita cargar la lista de los proyectos es administrador del area por ende deben de cargar los proyectos que vienen de areas inferiores para su revision o publicacion
    try {
      setLoading(true);
      const result = await fetch(
        process.env.NEXT_PUBLIC_ACCESLINK + "proyects/recursos/" + ProyectoID,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const data = await result.json();
      console.log(data);
      SetListaRecursos(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  //lista para tener la direccion de los iconos
  const ListaDocumentos = {
    // Word: "/img/Home/doc_icon.png",
    Word: "/img/Home/link_icon_142996.png",
    //Word2: "/img/Home/doc_icon.png"
  };
  const CerrarAgregarRecurso = () => {
    setAgregarRecurso(false);
    load();
  };
  //funcion para eliminar el recurso
  const EliminarRecurso = async (enlace) => {
    //e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "proyects/eliminar_recurso",
        {
          p_id_proyecto: ProyectoID,
          p_enlace: enlace,
        },
        {
          withCredentials: true,
        }
      );

      setLoading(false);
      load();
    } catch (error) {
      alert("Error en la peticion");
      setLoading(false);
    }
  };
  //hacer la funcion get para traer los recursos
  return (
    <Card className="h-full w-full rounded-none shadow-none">
      {/* ANADIR UN DIALOG PARA AGREGAR UN RECURSO XD*/}
      {openAgregarRecurso && (
        <CrearRecursoCompartido
          idProyecto={ProyectoID}
          cerrar={CerrarAgregarRecurso}
        />
      )}
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-0 flex  justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Recursos compartidos
            </Typography>
          </div>
        </div>
      </CardHeader>
      <CardBody className=" ">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-2">
          {ListaRecursos.map(
            (
              { r_tipo_recurso, r_enlace, r_fecha, r_nombre_recurso },
              index
            ) => (
              <div
                //task={task}
                className="bg-blue-gray-50 shadow-2xl cursor-pointer border-2 border-yellow-400 hover:border-4 hover:border-green-800 hover:shadow-2xl hover:shadow-green-700"
              >
                <a href={r_enlace} target="blank" key={index}>
                  <div className="mx-auto">
                    <div className="text-center">
                      <Avatar
                        src={ListaDocumentos[r_tipo_recurso]}
                        alt={r_tipo_recurso}
                        size="xl"
                        className="mt-3"
                      />
                    </div>
                    <div className="w-full p-4">
                      <input
                        className="w-full text-lg bg-blue-gray-50 font-semibold	text-blue-gray-800 "
                        disabled
                        value={r_nombre_recurso}
                      />
                    </div>

                    {/* 
                    <Chip
                      variant="ghost"
                      className="ml-4 w-max mb-6"
                      size="sm"
                      value={r_tipo_recurso}
                      color="blue-gray"
                    />
                    */}
                  </div>
                </a>
                {/* ANADIR LA OPCION DE ELIMINAR EL RECURSO */}
                {permite_agregar && (
                  <Tooltip content="Eliminar">
                    <IconButton
                      variant="text"
                      color="blue-gray"
                      onClick={() => EliminarRecurso(r_enlace)}
                    >
                      <TrashIcon className="h-6 w-6" />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            )
          )}
          {permite_agregar && (
            <div
              //task={task}
              className="bg-blue-gray-50 shadow-2xl cursor-pointer border-2 border-yellow-400 hover:border-4 hover:border-green-800 hover:shadow-2xl hover:shadow-green-700"
              onClick={() => setAgregarRecurso(true)}
            >
              <div className="mx-auto">
                <AiFillPlusCircle className="h-20 w-20 text-center mx-auto text-green-700" />
                {/* 
                    <div className="text-center">
                      <Avatar
                        src={ListaDocumentos[r_tipo_recurso]}
                        alt={r_tipo_recurso}
                        size="xl"
                        className="mt-3"
                      />
                    </div>
                    */}
                <div className="w-full p-4">
                  <input
                    className="w-full text-lg bg-blue-gray-50 font-semibold	text-blue-gray-800 "
                    disabled
                    value={"Agregar Recurso"}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
