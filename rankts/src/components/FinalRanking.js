import React, { useRef } from "react";
import html2canvas from "html2canvas";

const FinalRanking = ({ sortedSongs }) => {
  const rankingRef = useRef();

  const downloadScreenshot = async () => {
    if (rankingRef.current) {
      const canvas = await html2canvas(rankingRef.current, {
        scale: 2,
        backgroundColor: "#d3faf7" // page background
      });
      const link = document.createElement("a");
      link.download = "song_ranking.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  return (
    <div style={{ width: "100%", textAlign: "center", padding: "2rem 0" }}>
      {/* Ranking container (block-level, centered) */}
      <div
        ref={rankingRef}
        style={{
          display: "block",          // changed from inline-block
          margin: "0 auto",          // center horizontally
          textAlign: "center",
          backgroundColor: "#d3faf7",
          padding: "2rem",
          borderRadius: "1rem",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          maxWidth: "400px"          // optional: keeps container narrow
        }}
      >
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            color: "#e15921",
            marginBottom: "1.5rem"
          }}
        >
          Final Ranking
        </h2>
        <ol
          className="list-group list-group-numbered"
          style={{ paddingLeft: "1rem", textAlign: "left" }}
        >
          {sortedSongs.map((song) => (
            <li
              key={song.id}
              className="list-group-item"
              style={{
                backgroundColor: "#8dd3c6", // pastel teal
                color: "#ffffff",
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                marginBottom: "0.5rem",
                borderRadius: "0.5rem",
                border: "none",
                padding: "0.5rem 1rem"
              }}
            >
              {song.title}
            </li>
          ))}
        </ol>
      </div>

      {/* Button below the ranking container */}
      <div style={{ marginTop: "1.5rem" }}>
        <button
          className="btn btn-primary"
          onClick={downloadScreenshot}
        >
          Download Results
        </button>
      </div>
    </div>
  );
};

export default FinalRanking;
