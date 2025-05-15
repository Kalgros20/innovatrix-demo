import "../index.css";

interface Props {
  photoUrl?: string;
}

function PhotoResult({ photoUrl = "" }: Props) {
  return (
    <div className={"container"}>
      <img alt="Web component result" src={photoUrl} />
    </div>
  );
}

export default PhotoResult;
