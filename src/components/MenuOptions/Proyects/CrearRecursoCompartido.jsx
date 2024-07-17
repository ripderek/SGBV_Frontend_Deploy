import { React, useState, useEffect, useRef, use } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  Typography,
  IconButton,
  Alert,
  Card,
  CardHeader,
  CardBody,
  Input,
  Tooltip,
} from "@material-tailwind/react";
import axios from "axios";
import Loading from "@/components/loading";
export default function CrearRecursoCompartido({ idProyecto, cerrar }) {
  const [loading, setLoading] = useState(false);

  const [datosRecurso, SetDatosRecurso] = useState({
    p_id_proyecto: idProyecto,
    p_tipo_recurso: "Word",
    p_enlace: "",
    p_nombre_recurso: "",
  });
  const HandleChange = (e) => {
    SetDatosRecurso({ ...datosRecurso, [e.target.name]: e.target.value });
    console.log(datosRecurso);
  };
  /* PETICION POST PARA PODER AGREGAR EL RECURSO COMPARTIDO */
  const HandleSUbumit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "proyects/agregar_recurso",
        datosRecurso,
        {
          withCredentials: true,
        }
      );

      setLoading(false);
      cerrar();
    } catch (error) {
      alert("Error en la peticion");
      setLoading(false);
    }
  };
  return (
    <div>
      {loading && (
        <div>
          <Loading />
        </div>
      )}
      <Dialog size="sm" open={true} handler={cerrar} className=" rounded-none">
        <DialogHeader>
          Agregar Recurso compartido
          <Button
            color="red"
            variant="text"
            size="md"
            className="!absolute top-3 right-3"
            onClick={cerrar}
          >
            <Typography variant="h5" color="blue-gray">
              X
            </Typography>
          </Button>
        </DialogHeader>

        <form className=" sm:w-full" onSubmit={HandleSUbumit}>
          <Card className="w-full  mx-auto bg-blue-gray-100 rounded-none shadow-2xl">
            <CardHeader
              color="white"
              floated={false}
              shadow={false}
              className="m-0 grid place-items-center rounded-none py-8 px-4 text-center"
            >
              <div className="mb-4 w-full">
                <Input
                  variant="outlined"
                  color="black"
                  label="Nombre Recurso"
                  name="p_nombre_recurso"
                  onChange={HandleChange}
                />
              </div>
              <div className="mb-4 w-full">
                <Input
                  variant="outlined"
                  color="black"
                  label="Enlace Recurso"
                  name="p_enlace"
                  onChange={HandleChange}
                  //onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardBody className="text-right">
              <div>
                <Button
                  className="bg-green-700 p-3 justify-items-end rounded-none"
                  type="submit"
                >
                  <Typography variant="h6" color="white">
                    Aceptar
                  </Typography>
                </Button>
              </div>
            </CardBody>
          </Card>
        </form>
      </Dialog>
    </div>
  );
}
