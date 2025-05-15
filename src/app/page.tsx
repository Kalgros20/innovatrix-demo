"use client"
import type { FaceCallback, CallbackImage } from "@innovatrics/dot-face-auto-capture";
import { useCallback, useState } from "react";
import ComponentSelect from "./components/ComponentSelect";
import FaceAutoCapture from "./components/FaceAutoCapture";
import PhotoResult from "./components/PhotoResult";
import "./index.css";
import { Step } from "./types";

function App() {
  const [step, setStep] = useState<Step>(Step.SELECT_COMPONENT);
  const [photoUrl, setPhotoUrl] = useState<string>();

  const handlePhotoTaken = <T,>(
    imageData: CallbackImage<T>,
    content?: Uint8Array
  ) => {
    const imageUrl = URL.createObjectURL(imageData.image);
    setPhotoUrl(imageUrl);
  };

  const handleFaceCapturePhotoTaken: FaceCallback = (imageData, content) => {
    handlePhotoTaken(imageData, content);
  };


  const handleError = useCallback((error: Error) => {
    alert(error);
  }, []);

  const handleBackClick = () => {
    setPhotoUrl(undefined);
    setStep(Step.SELECT_COMPONENT);
  };

  const renderStep = (currentStep: Step) => {
    switch (currentStep) {
      case Step.FACE_CAPTURE:
        return (
          <FaceAutoCapture
            onPhotoTaken={handleFaceCapturePhotoTaken}
            onError={handleError}
            onBackClick={handleBackClick}
          />
        );

      default:
        return <ComponentSelect setStep={setStep} />;
    }
  };

  return (
    <div className={"app"}>
      <h1>DOT Web Components Integration</h1>
      {renderStep(step)}
      {photoUrl && <PhotoResult photoUrl={photoUrl} />}
    </div>
  );
}

export default App;
