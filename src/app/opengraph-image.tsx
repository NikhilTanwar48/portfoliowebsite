import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Nikhil Tanwar | Data Scientist & ML Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #05070e 0%, #0b132b 45%, #1e1136 100%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 20px",
              borderRadius: "9999px",
              background: "rgba(56, 189, 248, 0.12)",
              border: "1px solid rgba(56, 189, 248, 0.35)",
              fontSize: "20px",
              color: "#38bdf8",
            }}
          >
            nikhil.tanwar • Koblenz, DE
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "#94a3b8",
            }}
          >
            MSc Web & Data Science • Universität Koblenz
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "68px",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
            }}
          >
            Nikhil Tanwar.
          </div>
          <div
            style={{
              fontSize: "48px",
              fontWeight: 700,
              color: "#38bdf8",
              lineHeight: 1.15,
            }}
          >
            Predictive ML & Data Systems.
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#cbd5e1",
              maxWidth: "920px",
              lineHeight: 1.4,
            }}
          >
            620K+ Records Engineered • 0.87 F1 Transit Delay Classifier • -48.5% Pricing MAE • Springer Published Researcher
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "16px",
          }}
        >
          {["Python", "XGBoost", "Scikit-learn", "SQL", "Streamlit", "Databricks"].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  padding: "10px 20px",
                  borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  fontSize: "20px",
                  color: "#e2e8f0",
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

