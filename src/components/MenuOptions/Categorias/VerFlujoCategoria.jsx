import { useState, useEffect } from "react";
import { ArrowDownIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Card,
} from "@material-tailwind/react";
import { Loader } from "@/components/Widgets";
const TABLE_HEAD = ["Name", "Job"];
import { DefinirFlujo, VerFlujoXD } from "@/components/MenuOptions/Categorias";
export default function VerFlujoCategoria({
  idHistorial,
  cerrar,
  idCategoria,
}) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    load();
  }, []);
  const [loading, setLoad] = useState(false);

  const load = async () => {
    setLoad(true);
    //ojito aqui hay que realizar un cambio  ya que solo deben mostrarle los niveles que tienen estado true
    const result = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK +
        "proyects/FlujosCategoria/" +
        idHistorial,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    const data = await result.json();
    setPrecesora(data.length);
    //alert(data.length);
    //alert(data.length);
    setUsers(data);
    setLoad(false);
  };
  const [FlujoIDV, setFLujoIDV] = useState(0);
  const [Ver, sertVerFlujo] = useState(false);
  const VerFlujo = (id) => {
    setFLujoIDV(id);
    sertVerFlujo(true);
  };
  const CerrarFlujo = () => {
    sertVerFlujo(false);
  };
  const [openFlujo, SetOpenFlujo] = useState(false);
  const cerrarDefinir = () => {
    SetOpenFlujo(false);
    load();
  };
  const [predecesora, setPrecesora] = useState(0);
  return (
    <>
      {loading && <Loader />}

      <Dialog open={true} handler={cerrar} className="rounded-none" size="lg">
        {Ver && <VerFlujoXD cerrar={CerrarFlujo} id={FlujoIDV} />}
        {openFlujo && (
          <DefinirFlujo
            cerrar={cerrarDefinir}
            idcategoria={idHistorial}
            indicador={predecesora}
          />
        )}
        <DialogHeader className="bg-gray-200">
          Flujo Categoria
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
        <DialogBody divider className="overflow-y-scroll">
          <Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 "
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map(
                  (
                    { r_id_flujo, r_estado, r_id_tipo_jerarquia, r_fecha },
                    index
                  ) => {
                    const isLast = index === users.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";
                    return (
                      <tr
                        key={r_id_flujo}
                        className="cursor-pointer hover:bg-yellow-200"
                        onClick={() => VerFlujo(r_id_flujo)}
                      >
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {r_fecha}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {r_estado ? "Habilitado" : "Deshabilitado"}
                          </Typography>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </Card>
          <Button
            variant="outlined"
            color="orange"
            className="mt-2 rounded-none w-full mx-auto"
            onClick={() => SetOpenFlujo(true)}
          >
            Agregar flujo
          </Button>
        </DialogBody>
      </Dialog>
    </>
  );
}
