export default function Chip({ text, callback }) {
  return (
    <div className="Chip">
      <span>{text}</span>
      <span className="close" onClick={() => callback(text)}>
        X
      </span>
    </div>
  );
}
