import { FOOTER_COLUMNS } from "../../data/storeData";

export default function StoreFooter({ goInfo }) {
  return (
    <footer style={{ background: "#1e1b4b", color: "#c4b5fd", padding: "42px 20px 22px", marginTop: 20 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 44, marginBottom: 36 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>🚀</div>
              <span style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}>Shipmora</span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: "#a5b4fc", marginBottom: 0 }}>Your one-stop destination for everything you need.</p>
          </div>
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h4 style={{ color: "#fff", margin: "0 0 12px", fontSize: 13, fontWeight: 700 }}>{column.title}</h4>
              {column.links.map((link) => (
                <p
                  key={link}
                  onClick={() => goInfo(link)}
                  style={{ margin: "0 0 9px", fontSize: 12, cursor: "pointer", color: "#a5b4fc" }}
                  onMouseEnter={(event) => { event.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(event) => { event.currentTarget.style.color = "#a5b4fc"; }}
                >
                  {link}
                </p>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ margin: 0, fontSize: 12, color: "#7c3aed" }}>© 2025 Shipmora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
