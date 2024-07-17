import { React, useState, useEffect, useRef } from "react";
import { HiPaperAirplane } from "react-icons/hi2";
import { HiPhotograph } from "react-icons/hi";
import { AiOutlineUpload } from "react-icons/ai";
import axios from "axios";
import {
  Button,
  Dialog,
  Typography,
  Avatar,
  Tooltip,
  Input,
  DialogHeader,
} from "@material-tailwind/react";

import Loading from "@/components/loading";

export default function Comentarios({
  idproyecto,
  tituloproyecto,
  idarea,
  iduser,
}) {
  //Crear la tabla con usuarios

  const [loading, setLoading] = useState(false);

  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  //const [tipoMensaje, setTipoMensaje] = useState("");
  const [newImage, setNewImage] = useState(null);

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Activa el input de tipo "file"
    }
  };

  const [fileP, setFileP] = useState();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      //Cargar los chat ya creados

      setLoading(true);
      const result = await fetch(
        process.env.NEXT_PUBLIC_ACCESLINK +
          "chats/visualizar_chat/" +
          idproyecto,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const data = await result.json();
      //console.log("Aquie la data"+ idproyecto);
      //console.log(data);
      setComentarios(data);
      setLoading(false);
    } catch (error) {
      alert("error:" + error);
      setLoading(false);
    }
  };

  const handleCommentChange = (e) => setNuevoComentario(e.target.value);

  //funcion para registrar un comentario
  const registrarComentario = async (tipoMensaje, file) => {
    setLoading(true);
    try {
      if (tipoMensaje == "img") {
        if (file == null) {
            alert("Seleccione una imagen");
            setLoading(false);
            return;
          }
        const form = new FormData();
        form.set("file", file);
        form.set("p_id_proyecto", idproyecto);
        form.set("p_id_usuario", iduser);
        form.set("p_tipo_mensaje", tipoMensaje);

        const result = await axios.post(
          process.env.NEXT_PUBLIC_ACCESLINK + "chats/insertar_chat_img",
          form,
          {
            withCredentials: true,
          }
        );
      } else {
        if (!nuevoComentario.trim()) {
          alert("Tiene que escribir algo");
          setLoading(false);
          return;
        }
        const result = await axios.post(
          process.env.NEXT_PUBLIC_ACCESLINK + "chats/insertar_chat_text",
          {
            p_id_proyecto: idproyecto,
            p_id_usuario: iduser,
            p_tipo_mensaje: tipoMensaje,
            p_mensaje: nuevoComentario,
          },
          {
            withCredentials: true,
          }
        );
      }
      setNuevoComentario("");
      load();
      //console.log(result);
      setLoading(false);
    } catch (error) {
      alert("error:" + error);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = "";
    registrarComentario("text", file);
  };

  //enviar la peticion para guardar la nueva foto
  const ImagePreview = (e) => {
    try {
      const file = e.target.files[0];
      //setFileP(URL.createObjectURL(e.target.files[0]));
      registrarComentario("img", file);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {loading && <Loading />}
      <div className="p-4 border-b text-center">
        <Typography variant="h3" color="black">
          Comentarios
        </Typography>
      </div>
      <div className="flex flex-col max-h-96 flex-1 overflow-y-auto p-4 space-y-4">
        {comentarios.length == 0 ? (
          <div className="items-center text-center space-x-4">
            <div className="p-4 rounded-lg shadow-md ">
              <Typography variant="h6" className="mt-1">
                No hay comentarios aún
              </Typography>
            </div>
          </div>
        ) : (
          comentarios.map((comen) => (
            <div
              key={comen.r_id_chat}
              className={` items-start space-x-4 ${
                comen.r_id_user === iduser ? " " : ""
              }`}
            >
              <div
                className={`p-4 rounded-lg shadow-md relative ${
                  comen.r_id_user === iduser
                    ? "bg-green-400 text-white ml-40"
                    : "bg-gray-200 mr-40"
                }`}
              >
                <Typography
                  variant="h6"
                  color="black"
                  className={`font-semibold ${
                    comen.r_id_user === iduser ? "text-white" : ""
                  }`}
                >
                  {comen.r_nombres}
                </Typography>
                {comen.r_tipo_mensaje === "img" ? (

                    <img
                      className="  h-max w-max  mx-auto "
                      src={
                        !fileP
                          ? process.env.NEXT_PUBLIC_ACCESLINK +
                            "chats/visualizar_chat_img/" +
                            comen.r_id_chat
                          : fileP
                      }
                      alt="User image"
                    />
                ) : (
                  <Typography variant="body2" className="mt-1">
                    {comen.r_mensaje}
                  </Typography>
                )}
                <Typography variant="caption" color="black" className="">
                  {comen.r_fecha}
                </Typography>
              </div>
            </div>
          ))
        )}
      </div>
      <form onSubmit={handleSubmit} className="p-4 flex space-x-2">
        <div>
          <input
            type="file"
            id="upload-image"
            className="hidden"
            accept="image/png, .jpeg"
            onChange={ImagePreview}
            ref={fileInputRef}
          />
          <label htmlFor="upload-image">
            <Button
              variant="outlined"
              component="span"
              onClick={handleButtonClick}
            >
              <HiPhotograph className="w-6 h-6" />
            </Button>
          </label>
        </div>
        <Input
          type="text"
          value={nuevoComentario}
          onChange={handleCommentChange}
          placeholder="Escribe un comentario"
          className="flex-grow"
        />
        <Button type="submit" variant="filled">
          <HiPaperAirplane className="w-6 h-6" />
        </Button>
      </form>
    </div>
  );
}
