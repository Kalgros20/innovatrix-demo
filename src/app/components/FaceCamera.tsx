"use client";

// import type {
//   FaceCameraProps,
//   HTMLFaceCaptureElement,
// } from "@innovatrics/dot-face-auto-capture";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

const FaceAutoCapture = dynamic(
  () => import("@innovatrics/dot-face-auto-capture"),
  { ssr: false } // Desabilita o SSR para esse componente
);

function FaceCamera(props) {
  const faceCaptureRef = useRef(null);

  useEffect(() => {
    if (faceCaptureRef.current) {
      faceCaptureRef.current.cameraOptions = props;
    }
  }, [props]); // Atualiza se props mudar

  return <x-dot-face-auto-capture ref={faceCaptureRef} />;
}

export default FaceCamera;
