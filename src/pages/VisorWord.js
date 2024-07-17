import React from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

export default function VisorWord() {
  const docs = [
    {
      uri: "https://encuesta.uteq.edu.ec:8080/api/public/word/260",
      fileType: "docx",
      filenName: "demo.docx",
    },
  ];
  return (
    <div>
      <DocViewer
        documents={docs}
        pluginRenderers={DocViewerRenderers}
        style={{ height: 1000 }}
      />
    </div>
  );
}
