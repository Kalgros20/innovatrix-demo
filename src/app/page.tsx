"use client";

import type {
  CallbackImage,
  FaceCallback,
} from "@innovatrics/dot-face-auto-capture";
import { useCallback, useState } from "react";
import ComponentSelect from "./components/ComponentSelect";

import PhotoResult from "./components/PhotoResult";
import styles from "./styles/index.module.css";
import { Step } from "./types";
import dynamic from "next/dynamic";

const FaceAutoCapture = dynamic(() => import('./components/FaceAutoCapture'), { ssr: false });

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

    var reader = new FileReader();
    reader.readAsDataURL(imageData.image);
    reader.onloadend = function () {
      var base64data = reader.result;
      console.log(base64data);
    };

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
    <div className={styles.app}>
      <h1>DOT Web Components Integration</h1>
      {renderStep(step)}
      {photoUrl && <PhotoResult photoUrl={photoUrl} />}
    </div>
  );
}

export default App;
