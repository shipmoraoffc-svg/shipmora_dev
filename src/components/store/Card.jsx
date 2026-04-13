import { useState } from "react";

export default function Card({ p, setCart, wl, setWl, user, onLogin }) {
  const [added, setAdded] = useState(false);
  const wished = wl.some((item) => item.id === p.id);
  const disc = Math.round((1 - p.price / p.orig) * 100);

  const addCart = () => {
    setCart((current) => {
      const existing = current.find((item) => item.id === p.id);
      return existing ? current.map((item) => (item.id === p.id ? { ...item, qty: item.qty + 1 } : item)) : [...current, { ...p, qty: 1 }];
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const toggleWishlist = () => {
    if (!user) {
      onLogin();
      return;
    }
    setWl((current) => (wished ? current.filter((item) => item.id !== p.id) : [...current, p]));
  };

  return (
    <div
      style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #f3f4f6", transition: "transform 0.2s, box-shadow 0.2s" }}
      onMouseEnter={(event) => { event.currentTarget.style.transform = "translateY(-4px)"; event.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.12)"; }}
      onMouseLeave={(event) => { event.currentTarget.style.transform = "none"; event.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)"; }}
    >
      <div style={{ height: 170, background: `linear-gradient(135deg,${p.color}22,${p.color}44)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 68, position: "relative" }}>
        {p.emoji}
        {p.badge && <span style={{ position: "absolute", top: 10, left: 10, background: "#f59e0b", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 20 }}>{p.badge}</span>}
        <span style={{ position: "absolute", bottom: 10, left: 10, background: "linear-gradient(135deg,#10b981,#059669)", color: "#fff", fontSize: 10, fontWeight: 800, padding: "3px 9px", borderRadius: 20 }}>{disc}% off</span>
        <button onClick={toggleWishlist} style={{ position: "absolute", top: 10, right: 10, background: wished ? "#fee2e2" : "rgba(255,255,255,0.9)", border: "none", borderRadius: "50%", width: 30, height: 30, cursor: "pointer", fontSize: 15 }}>
          {wished ? "❤️" : "🤍"}
        </button>
      </div>
      <div style={{ padding: "12px 14px 14px" }}>
        <p style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 600, color: "#111827", lineHeight: 1.3 }}>{p.name}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
          <span style={{ color: "#f59e0b", fontSize: 11 }}>{"★".repeat(Math.floor(p.rating))}{"☆".repeat(5 - Math.floor(p.rating))}</span>
          <span style={{ fontSize: 11, color: "#9ca3af" }}>{p.rating} ({p.reviews.toLocaleString()})</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <span style={{ fontSize: 17, fontWeight: 800, color: "#111827" }}>₹{p.price.toLocaleString()}</span>
          <span style={{ fontSize: 11, color: "#9ca3af", textDecoration: "line-through" }}>₹{p.orig.toLocaleString()}</span>
        </div>
        <button onClick={addCart} style={{ width: "100%", padding: 9, borderRadius: 9, border: "none", background: added ? "#10b981" : "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
          {added ? "✓ Added!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
