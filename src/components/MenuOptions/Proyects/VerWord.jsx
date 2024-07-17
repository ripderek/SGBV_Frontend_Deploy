import React from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

export default function VerWord({ link }) {
  const docs = [
    {
      uri: link,
      fileType: "docx",
      filenName: "demo.docx",
    },
  ];
  return (
    <div>
      {link}
      <DocViewer
        documents={docs}
        pluginRenderers={DocViewerRenderers}
        style={{ height: 1000 }}
      />
    </div>
  );
}
