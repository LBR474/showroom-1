import { Link } from "react-router-dom";

function Arova() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
      }}
    >
      <Link
        to="/"
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 10,
          padding: "12px 18px",
          background: "#111",
          color: "white",
          textDecoration: "none",
          borderRadius: "10px",
          border: "1px solid #333",
          fontFamily: "Arial",
        }}
      >
        ← Back to Showroom
      </Link>

      <iframe
        src="https://lbr474.github.io/arova-1/"
        title="Richmond Valley Council Map Redraw"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </div>
  );
}

export default Arova;
