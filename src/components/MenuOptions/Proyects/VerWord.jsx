import React, { useEffect, useState } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import axios from "axios";

export default function VerWord({ link }) {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const response = await axios.get(link, {
          responseType: "blob",
          withCredentials: true, // Incluye las credenciales en la solicitud
        });
        const file = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const fileURL = URL.createObjectURL(file);
        console.log(fileURL);
        setDocs([{ uri: fileURL, fileType: "docx" }]);
      } catch (error) {
        console.error("Error fetching the document:", error);
      }
    };

    fetchDoc();
  }, []);

  return (
    <div>
      {docs.length > 0 ? (
        <DocViewer
          documents={docs}
          pluginRenderers={DocViewerRenderers}
          style={{ height: 1000 }}
        />
      ) : (
        <p>Loading document...</p>
      )}
    </div>
  );
}
