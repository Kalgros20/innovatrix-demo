"use-client";

import type {
  FaceCallback,
  FaceComponentData,
} from "@innovatrics/dot-face-auto-capture";
import {
  dispatchControlEvent,
  FaceCustomEvent,
  ControlEventInstruction,
} from "@innovatrics/dot-face-auto-capture/events";
import { useEffect, useState } from "react";
import FaceUi from "./FaceUi";

import "../index.css";
import "./button.css";
import dynamic from "next/dynamic";
import FaceCamera from "./FaceCamera";

interface Props {
  onPhotoTaken: FaceCallback;
  onError: (error: Error) => void;
  onBackClick: () => void;
}

function FaceAutoCapture({ onPhotoTaken, onError, onBackClick }: Props) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handlePhotoTaken: FaceCallback = async (imageData, content) => {
    setIsButtonDisabled(false);
    onPhotoTaken(imageData, content);
  };

  const handleContinueDetection = () => {
    dispatchControlEvent(
      FaceCustomEvent.CONTROL,
      ControlEventInstruction.CONTINUE_DETECTION
    );

    setIsButtonDisabled(true);
  };



  return (
    <>
      <h2>Face auto capture</h2>
      <div>
        <button className={"primary"} onClick={onBackClick}>
          Go back
        </button>
        <button
          className={"primary"}
          onClick={handleContinueDetection}
          disabled={isButtonDisabled}
        >
          Continue detection
        </button>
      </div>
      <div className={"container"}>
        <FaceCamera
          cameraFacing="user"
          onPhotoTaken={handlePhotoTaken}
          onError={onError}
        />
        <FaceUi showCameraButtons />
      </div>
    </>
  );
}

export default FaceAutoCapture;
