export default function Breadcrumb({ items }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {item.action ? (
            <button onClick={item.action} style={{ background: "rgba(255,255,255,0.12)", border: "none", borderRadius: 7, padding: "4px 11px", color: "rgba(255,255,255,0.75)", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
              {item.label}
            </button>
          ) : (
            <span style={{ background: "rgba(255,255,255,0.18)", borderRadius: 7, padding: "4px 11px", color: "#fff", fontSize: 12, fontWeight: 700 }}>
              {item.label}
            </span>
          )}
          {index < items.length - 1 && <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>›</span>}
        </span>
      ))}
    </div>
  );
}
