import React from "react";

export default function PruebaIframe() {
  return (
    <div>
      <div style={{ height: "100vh", width: "100%" }}>
        <iframe
          src={"https://encuesta.uteq.edu.ec:8080/api/public/word/260"}
          style={{ border: "none", width: "100%", height: "100%" }}
          allowFullScreen
        />
      </div>
    </div>
  );
}
