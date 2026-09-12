import { Link } from "react-router-dom";

function Stateside() {
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
          left: "300px",
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
        src="https://lbr474.github.io/Halcyon-Knights-1/"
        title="Halcyon Knights dynamic logo"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </div>
  );
}

export default Stateside;
