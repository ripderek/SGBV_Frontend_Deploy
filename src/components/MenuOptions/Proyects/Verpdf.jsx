import { Fragment, React, useState, useEffect } from "react";

import {
  DialogBody,
  DialogFooter,
  Tabs,
  Tab,
  TabsHeader,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";

export default function Verpdf({ link, id, admin }) {
  return (
    <div className="bg-white h-auto">
      <DialogBody divider={true}>
        <Fragment>
          <div className="bg-white">
            <iframe
              src={link}
              height="100%"
              width="100%"
              className="h-screen"
            />
          </div>
        </Fragment>
      </DialogBody>
      <DialogFooter className="justify-between"></DialogFooter>
    </div>
  );
}
